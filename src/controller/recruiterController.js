const { where } = require("sequelize");
const { recruiterSignUp } = require("../model/recruiterModel");
const { recruiterJobPost } = require("../model/recruiterModel");
const { recruiterProfile } = require("../model/recruiterModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { v4: uuidv4 } = require("uuid");
const uniqueId = uuidv4();
const secertKey =
  "192b9bdd22ab9ed4d12e236c78afcb9a393ec15f71bbf5dc987d54727823bcbf";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "ahmadyounas2k18@gmail.com",
    pass: "rdopwhmnfkfkgybw",
  },
});
exports.getData = async (req, res) => {
  res.status(200).json({ message: "OK" });
};

exports.postData = async (req, res) => {};

exports.recruiterLogin = async (req, res) => {
  try {
    const { password } = req.body;
    const userEmail = req.body.userEmail;
    const user = await recruiterSignUp.findOne({ where: { userEmail } });

    if (!user) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    if (password !== user.password) {
      return res.status(402).json({ error: "Password Invalid" });
    }

    if (user.check == "1") {
      const token = jwt.sign({ userId: user.id }, secertKey, {
        expiresIn: "1h",
      });

      res.status(200).json({ token });
    } else {
      res.status(201).json({ message: "Vertification Pending" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.recruiterSignUp = async (req, res) => {
  console.log(req.body);
  const fullName = req.body.name;
  const userName = req.body.username;
  const userEmail = req.body.email;
  const password = req.body.password;
console.log("Email", userEmail);
console.log("Name", userName);
console.log("fullName", fullName);
console.log("password", password);
  const user = await recruiterSignUp.findOne({ where: { userEmail } });
  if (user) {
    return res.status(409).json({ error: "credentials already Exist" });
  }
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log("hashedPassword", hashedPassword);
    const user = await recruiterSignUp.create({
      fullName,
      userEmail,
      userName,
      password,
      check: "0",
    });
    console.log("QWERTY");
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
exports.recruiterPostJob = async (req, res) => {
  console.log(req.body);
  const JobTitle = req.body.jobTitle;
  const companyLogo = req.body.company;
  const City = req.body.city;
  const Country = req.body.country;
  const JobDescription = req.body.jobDescription;
  const WorkType = req.body.workplaceType;
  const Salary = req.body.salary;
  const Tags = req.body.tags;
  const recuriterID = uniqueId;
  try {
    const user = await recruiterJobPost.create({
      JobTitle,
      companyLogo,
      City,
      Country,
      JobDescription,
      WorkType,
      Salary,
      Tags,
      recuriterID,
    });
    console.log("QWERTY");
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
// Get Posted Job

exports.GetPostedJob = async (req, res) => {
  await recruiterJobPost
    .findAll()
    .then((data) => {
      const jsonData = data.map((item) => item.toJSON());
      res.status(200).json(jsonData);
    })
    .catch((error) => {
      res.status(500).json({ error: "An error occurred while fetching data." });
      console.log("error", error);
    });
};

exports.recruiterProfile = async (req, res) => {
  console.log("req.body", req.body);
  const CompanyName = req.body.companyName;

  const CompanyEmail = req.body.companyEmail;
  const number = req.body.phoneNumber;
  const CompanyWebsiteLink = req.body.companyWebsite;
  const companyBio = req.body.bio;
  const Experience = req.body.experience;
  const Categories = req.body.categories;
  const WorkingTime = req.body.workingTime;

  try {
    const user = await recruiterProfile.create({
      CompanyName,
      CompanyEmail,
      number,
      CompanyWebsiteLink,
      companyBio,
      Experience,
      Categories,
      WorkingTime,
    });
    console.log("QWERTY");
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

exports.getRecruiterProfile = async (req, res) => {
  await recruiterJobPost
    .find({where:{id:1}})
    .then((data) => {
      const jsonData = data.map((item) => item.toJSON());
      res.status(200).json(jsonData);
    })
    .catch((error) => {
      res.status(500).json({ error: error });
    });
};
exports.UpdateProfileInfo = async (req, res) => {
  const [updatedRows] = await recruiterSignUp.update(req.body, {
    where: { id: "4" },
  });
  console.log("updatedRows", updatedRows);
  if (updatedRows === 1) {
    res.status(200).json({ message: "User information updated successfully" });
  } else {
    res.status(404).json({ message: "User not found" });
  }
};
exports.getJobDetials = async (req, res) => {
  const id = req.params.id;
  console.log("id",id);
  await recruiterJobPost
    .findByPk(id)
    .then((data) => {
      res.status(200).json(data.dataValues);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
};
