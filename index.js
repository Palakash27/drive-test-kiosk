const express = require("express");
const expressSession = require("express-session");
const fileUpload = require("express-fileupload");
const flash = require("connect-flash");

if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

// Models
const User = require("./model/user");

// Middlewares
const authMiddleware = require("./middleware/authMiddleware");
const redirectIfAuthenticatedMiddleware = require("./middleware/redirectIfAuthenticatedMiddleware");
const driverAuthorizationMiddleware = require("./middleware/driverAuthorizationMiddleware");
const adminAuthorizationMiddleware = require("./middleware/adminAuthorizationMiddleware");
const examinerAuthorizationMiddleware = require("./middleware/examinerAuthorizationMiddleware");
const passwordValidationMiddleware = require("./middleware/passwordValidationMiddleware");

// DB
const mongoose = require("mongoose");
const username = "root";
const password = "root";
const cluster = "cluster0.fqblj";
const dbname = "driveTestKiosk";

mongoose.connect(
    `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${dbname}?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
    }
);

const app = express();

app.set("view engine", "ejs");

global.loggedIn = null;
global.userType = null;

app.use(flash());
app.use(express.static("public"));
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use("/favicon.ico", express.static("public/img/logo.png"));
app.use(fileUpload());
app.use(
    expressSession({
        secret: "secret",
    })
);
app.use("*", (req, res, next) => {
    loggedIn = req.session.userId;
    userType = req.session.userType;
    next();
});

app.listen(process.env.PORT || 3000, () => {
    console.log("Server started");
});

// Controllers
const dashboardController = require("./controllers/dashboard");
const g2TestController = require("./controllers/g2Test");
const storeG2TestController = require("./controllers/storeG2Test");
const gTestController = require("./controllers/gTest");
const appointmentController = require("./controllers/appointment");
const createAppointmentController = require("./controllers/createAppointment");
const updateGTestController = require("./controllers/updateGTest");
const resultController = require("./controllers/result");
const examinerController = require("./controllers/examiner");
const examinerFeedbackController = require("./controllers/examinerFeedback");

const loginController = require("./controllers/login");
const userLoginController = require("./controllers/userLogin");
const signupController = require("./controllers/signup");
const storeUserController = require("./controllers/storeUser");
const logoutController = require("./controllers/logout");

app.get("/", dashboardController);

app.get(
    "/g2_test",
    authMiddleware,
    driverAuthorizationMiddleware,
    g2TestController
);

app.post(
    "/g2_test",
    authMiddleware,
    driverAuthorizationMiddleware,
    storeG2TestController
);

app.get(
    "/g_test",
    authMiddleware,
    driverAuthorizationMiddleware,
    gTestController
);

app.post(
    "/update_g_test",
    authMiddleware,
    driverAuthorizationMiddleware,
    updateGTestController
);

app.get(
    "/appointment",
    authMiddleware,
    adminAuthorizationMiddleware,
    appointmentController
);

app.get(
    "/create/appointment",
    authMiddleware,
    adminAuthorizationMiddleware,
    createAppointmentController
);

app.get(
    "/result",
    authMiddleware,
    adminAuthorizationMiddleware,
    resultController
);

app.get(
    "/examiner",
    authMiddleware,
    examinerAuthorizationMiddleware,
    examinerController
);

app.post(
    "/examiner",
    authMiddleware,
    examinerAuthorizationMiddleware,
    examinerFeedbackController
);

app.get("/auth/signup", redirectIfAuthenticatedMiddleware, signupController);

app.post(
    "/users/signup",
    redirectIfAuthenticatedMiddleware,
    passwordValidationMiddleware,
    storeUserController
);

app.get("/auth/login", redirectIfAuthenticatedMiddleware, loginController);

app.post(
    "/users/login",
    redirectIfAuthenticatedMiddleware,
    userLoginController
);

app.get("/auth/logout", logoutController);

app.use((req, res) => res.render("notFound"));
