const mysql = require("mysql");
const express = require("express");
const cors = require("cors");
var validator = require("validator");
const bycrpt = require("bcryptjs");

const app = express();
app.use(cors());
app.use(express.json());

var con = mysql.createConnection({
  host: "localhost",
  port: 8111,
  user: "root",
  password: "",
  database: "elib",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

//insert registration data into db

app.post("/register", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const contact = req.body.contact;
  const age = req.body.age;
  const password = req.body.password;
  const cpassword = req.body.cpassword;

  var regEx = /^[0-9a-zA-Z]+$/;
  var alpha = /^[A-Za-z]+$/;
  if (password.length < 8) {
    res.json({ status: "tooshort" });
    return;
  } else if (password.length > 20) {
    res.json({ status: "toolong" });
    return;
  } else if (!regEx.test(password)) {
    // res.send({ message: "Password should contain only alphanumeric characters!" })
    res.json({ status: "invpass" });
    return;
  } else if (!validator.isEmail(email)) {
    // res.send({ message: "email is not valid" })
    res.json({ status: "invemail" });
    return;
  } else if (!con.query("SELECT COUNT(email) FROM mem_norm_one")) {
    res.json({ status: "dupemail" });
    return;
  } else { 
    bycrpt.hash(password, 10, (err, hash) => {
      if (err) {
        console.log(err);
      }
      if (password === cpassword) {
        //QUERY BEFORE NORMALIZATION:
        // con.query(
        //   "INSERT INTO registration (name, email, contact, password,cpassword) VALUES (?,?,?,?,?)",
        //   [name, email, contact, age, hash],
        //   (err, result) => {
        //     if (err) {
        //       console.log(err);
        //     } else {
        //       res.json({ status: "ok" });
        //     }
        //   }
        // );

        con.query(
          "Insert into reg_norm_one (contact,email,name) values (?,?,?)",
          [contact, email, name],
          (err, result) => {
            if (err) {
              console.log(err);
              return;
            } else {
              res.json({ status: "ok" });
              return;
            }
          }
        );
        con.query(
          "Insert into reg_norm_two (email,cpassword) values (?,?)",
          [email, hash],
          (err, result) => {
            if (err) {
              console.log(err);
            } 
          }
        );
        con.query(
          "Insert into reg_norm_three (password,cpassword) values (?,?)",
          [hash, hash],
          (err, result) => {
            if (err) {
              console.log(err);
            } 
          }
        );
      } else {
        res.json({ status: "passmatch" });
      }
    });
  }
});

app.get("/register", (req, res) => {
  con.query("SELECT email,cpassword FROM reg_norm_two", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/logout", (req, res) => {
  req.logout();
  req.session = null;
  res.redirect("/login");
});

//add new members
app.post("/members", (req, res) => {
  // const name = req.body.name;
  const email = req.body.email;
  const mis = req.body.mis;
  // const contact = req.body.contact;
  const issuedbook = req.body.issuedbook;
  const issuedate = req.body.issuedate;
  const returndate = req.body.returndate;
  // const days=timestampdiff(days,issuedate,returndate);

  // con.query(
  //   "INSERT INTO members (email,mis,issuedbook,issuedate,returndate) VALUES (?,?,?,?,?)",
  //   [email, mis, issuedbook, issuedate, returndate],
  //   (err, result) => {
  //     console.log(err);
  //   }
  // );
  con.query(
    'Insert into mem_norm_one(email,issueDate,issuedBooks) values(?,?,?) ',
    [email, issuedate, issuedbook],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.json({ status: "ok" }); 
        return;
      }
    }
  );
  con.query(
    "Insert into mem_norm_two(email,mis) values(?,?)",
    [email, mis],
    (err, result) => {
      if (err) {
        console.log(err);
      }
    }
  );
  con.query(
    "Insert into mem_norm_three(mis,issueDate,returnDate) values(?,?,?)",
    [mis, issuedate, returndate],
    (err, result) => {
      if (err) {
        console.log(err);
      }
    }
  );
});

// insert members data into db
app.get("/members", (req, res) => {
  //OUERY BEFORE NORMALIZATION
  // con.query(
  //   "select name,contact,registration.email,members.mis,members.issuedBook,members.issueDate,members.returnDate from registration left join members on members.email=registration.email;",
  //   (err, result) => {
  //     // console.log(result[0]);
  //     console.log(err);
  //     res.send(result);
  //   }
  // );

  con.query(
    'select reg_norm_one.name,reg_norm_one.contact,reg_norm_one.email,mem_norm_two.mis,mem_norm_one.issuedBooks,mem_norm_three.issueDate,mem_norm_three.returnDate,status.status,status.isbn from mem_norm_one inner join reg_norm_one,mem_norm_two,mem_norm_three,status where mem_norm_one.email=reg_norm_one.email and mem_norm_one.email=mem_norm_two.email and mem_norm_three.mis=mem_norm_two.mis and mem_norm_one.issuedBooks=status.isbn and status.status!="Lost";',
    (err, result) => {
      // console.log(result[0]);
      console.log(err);
      res.send(result);
    }
  );
});

app.delete("/members/(:issuedBooks)", (req, res) => {
  const issuedBook = req.params.issuedBooks;
  const mis = req.params.mis;
  con.query(
    "DELETE FROM mem_norm_one WHERE issuedBooks = ?",
    issuedBook,
    (err, result) => {
      if (err) {
        console.log("err");
        console.log(err.response.data);
      } else {
        console.log("result");
        res.send(result);
      }
    }
  );
});

app.delete("/members/(:mis)", (req, res) => {
  const mis = req.params.mis;
  con.query("DELETE FROM mem_norm_two WHERE mis = ?", mis, (err, result) => {
    if (err) {
      console.log("err");
      console.log(err.response.data);
    } else {
      console.log("result");
      res.send(result);
    }
  });
});

//insert book data into db
app.post("/addbook", (req, res) => {
  const isbn = req.body.isbn;
  const title = req.body.title;
  const author = req.body.author;
  const year = req.body.year;
  const publisher = req.body.publisher;
  const status = req.body.status;
  const quantity = req.body.quantity;
  const genre = req.body.genre;

  //QUERY BEFORE NORMALIZATION
  // con.query(
  //   "INSERT INTO books (isbn,title,author,year_of_publication,publisher,genre) VALUES (?,?,?,?,?,?)",
  //   [isbn, title, author, year, publisher, genre],
  //   (err, result) => {
  //     console.log(result);
  //     console.log(err);
  //   } 
  // );

  con.query(
    "Insert into book_norm_one(title,author,year_of_publication,isbn) values(?,?,?,?)",
    [title, author, year, isbn],
    (err, result) => {
      if (err) {
        console.log(err);
      }
    }
  );
  con.query(
    "Insert into book_norm_two(title,publisher,genre) values(?,?,?)",
    [title, publisher, genre],
    (err, result) => {
      if (err) {
        console.log(err);
      } 
    }
  );
});

app.get("/addbook", (req, res) => {
  // con.query(
  //   "SELECT * FROM books inner join status where books.isbn=status.isbn",
  //   (err, result) => {
  //     res.send(result);
  //   }
  // );
  con.query(
    'select status.isbn,book_norm_one.title,author,year_of_publication,book_norm_two.publisher,book_norm_two.genre,status.status from book_norm_one inner join book_norm_two,status where book_norm_one.title=book_norm_two.title and status.isbn=book_norm_one.isbn; ',
    (err, result) => {
      res.send(result);
    }
  );
});

app.get("/lostbook", (req, res) => {
  // con.query(
  //   'SELECT * FROM books inner join status where books.isbn=status.isbn and status.status="Lost"',
  //   (err, result) => {
  //     res.send(result);
  //   }
  // );
  con.query(
    'select status.isbn,book_norm_one.title,author,year_of_publication,book_norm_two.publisher,book_norm_two.genre,status.status from book_norm_one inner join book_norm_two,status where book_norm_one.title=book_norm_two.title and status.isbn=book_norm_one.isbn and status.status="Lost";',
    (err, result) => {
      res.send(result);
    }
  );
});

app.get("/replacebook", (req, res) => {
  con.query(
    'select status.isbn,book_norm_one.title,author,year_of_publication,book_norm_two.publisher,book_norm_two.genre,status.status from book_norm_one inner join book_norm_two,status where book_norm_one.title=book_norm_two.title and status.isbn=book_norm_one.isbn and status.status="Replaced";',
    (err, result) => {
      res.send(result);
    }
  );
});

app.get("/damagedbook", (req, res) => {
  con.query(
    'select status.isbn,book_norm_one.title,author,year_of_publication,book_norm_two.publisher,book_norm_two.genre,status.status from book_norm_one inner join book_norm_two,status where book_norm_one.title=book_norm_two.title and status.isbn=book_norm_one.isbn and status.status="Damaged";',
    (err, result) => {
      res.send(result);
    }
  );
});

// app.post("/requestbook",(req,res)=>{
//   const title=req.body.title;
//   const author=req.body.author;
//   con.query(
//     "insert into "
// })
 
app.listen(8000, () => {
  console.log("Server Running");
});
