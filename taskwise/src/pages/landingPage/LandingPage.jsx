import React from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import Logo from "../../assets/Logo.png";
import board from "../../assets/board.png";
import ProjectsDetailedView from "../../assets/ProjectsDetailedView.png";
import CalendarView from "../../assets/CalendarView.png";
import WorkspaceView from "../../assets/WorkspaceView.png";
import AIImage1 from "../../assets/AIImage1.png";
import AIImage2 from "../../assets/AIImage2.png";
import AIImage3 from "../../assets/AIImage3.png";
import { Container, Link } from "@mui/material";
import DragDropIcon from "@mui/icons-material/DragIndicator";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ClarityIcon from "@mui/icons-material/Visibility";
import AiAutomationIcon from "@mui/icons-material/AutoAwesome";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";

function LandingPage() {
  const navigate = useNavigate();

  const handleClickLogin = () => {
    navigate("/login");
  };

  const handleClickSignup = () => {
    navigate("/signup");
  };

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const [expanded, setExpanded] = useState(null);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : null);
  };
  const features = [
    {
      icon: <DragDropIcon sx={{ fontSize: "2rem" }} />,
      title: "Drag & drop",
      description: "Keep all related project files in one workspace.",
    },
    {
      icon: <NotificationsIcon sx={{ fontSize: "2rem" }} />,
      title: "Notifications",
      description: "Notify the right people about the updates they need.",
    },
    {
      icon: <ClarityIcon sx={{ fontSize: "2rem" }} />,
      title: "Find clarity",
      description:
        'Everyone can have a "bird\'s eye view" of tasks and deadlines.',
    },
    {
      icon: <AiAutomationIcon sx={{ fontSize: "2rem" }} />,
      title: "AI automation",
      description:
        "Automate your tasks and optimize workflow with TaskWise AI.",
    },
  ];
  const accordionItems = [
    {
      title: "How can TaskWise simplify my task management process?",
      content:
        "TaskWise streamlines task organization through four key sections: Workspaces, where Projects are housed, Tasks are managed, and a dedicated Calendar section facilitates scheduling and planning.",
    },
    {
      title: "How can TaskWise simplify my task management process?",
      content:
        "TaskWise streamlines task organization through four key sections: Workspaces, where Projects are housed, Tasks are managed, and a dedicated Calendar section facilitates scheduling and planning.",
    },
    {
      title: "How can TaskWise simplify my task management process?",
      content:
        "TaskWise streamlines task organization through four key sections: Workspaces, where Projects are housed, Tasks are managed, and a dedicated Calendar section facilitates scheduling and planning.",
    },
    {
      title: "How can TaskWise simplify my task management process?",
      content:
        "TaskWise streamlines task organization through four key sections: Workspaces, where Projects are housed, Tasks are managed, and a dedicated Calendar section facilitates scheduling and planning.",
    },
    {
      title: "How can TaskWise simplify my task management process?",
      content:
        "TaskWise streamlines task organization through four key sections: Workspaces, where Projects are housed, Tasks are managed, and a dedicated Calendar section facilitates scheduling and planning.",
    },
  ];

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" style={{ backgroundColor: "#ffffff" }}>
          <Toolbar>
            <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
              <img
                src={Logo}
                alt="Taskwise Logo"
                style={{
                  width: isSmallScreen
                    ? "48px"
                    : isLargeScreen
                    ? "88px"
                    : "68px",
                  height: isSmallScreen
                    ? "45px"
                    : isLargeScreen
                    ? "85px"
                    : "65px",
                }}
              />
            </Box>
            <Button
              sx={{
                color: "#000000",
                backgroundColor: "#ffffff",
                border: "1px solid #e0e0e0",
                borderRadius: "20px",
                textTransform: "none",
                padding: "6px 16px",
                "&:hover": {
                  backgroundColor: "#f5f5f5",
                  borderColor: "#e0e0e0",
                },
              }}
              onClick={handleClickLogin}
            >
              Log In
            </Button>
            <Button
              sx={{
                color: "#ffffff",
                backgroundColor: "#4285F4",
                borderRadius: "20px",
                textTransform: "none",
                padding: "6px 16px",
                ml: 2,
                "&:hover": {
                  backgroundColor: "#357ae8",
                },
              }}
              onClick={handleClickSignup}
            >
              Sign Up
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Box
        sx={{
          pt: isSmallScreen ? 1 : isLargeScreen ? 2 : 2,
          pb: 2,
          px: isSmallScreen ? 1 : isLargeScreen ? 4 : 2,
        }}
      >
        <Container
          sx={{
            display: "flex",
            flexDirection: isSmallScreen ? "column" : "row",
            alignItems: "center",
            pl: isLargeScreen ? 12 : 0,
            pt: isSmallScreen ? 1 : isLargeScreen ? 3 : 2,
          }}
        >
          <Box
            sx={{
              px: isSmallScreen ? 1 : 1.5,
              textAlign: isSmallScreen ? "center" : "left",
            }}
          >
            <Typography
              variant={isSmallScreen ? "h6" : isLargeScreen ? "h4" : "h5"}
              gutterBottom
              sx={{ fontWeight: "bold" }}
            >
              AI Task management
            </Typography>
            <Typography
              variant={isSmallScreen ? "h6" : isLargeScreen ? "h4" : "h5"}
              gutterBottom
              sx={{ fontWeight: "bold" }}
            >
              software loved by..
            </Typography>
            <Typography
              variant={isSmallScreen ? "h6" : isLargeScreen ? "h4" : "h5"}
              gutterBottom
              sx={{ color: "#3f51b5", fontWeight: "bold" }}
            >
              Teams
            </Typography>
            <Box sx={{ pl: 0, pt: 2 }}>
              <List sx={{ margin: 0, paddingLeft: isSmallScreen ? 1 : 1 }}>
                {[
                  "Simple to use, powerful when you need it",
                  "Manage multiple complex projects",
                  "Scales into a full platform",
                  "Generate your Tasks with TaskWise AI",
                ].map((text, index) => (
                  <ListItem
                    key={index}
                    sx={{ padding: 0, marginBottom: "10px" }}
                  >
                    <ListItemIcon sx={{ minWidth: "30px" }}>
                      <TaskAltIcon />
                    </ListItemIcon>
                    <ListItemText primary={text} sx={{ fontWeight: "bold" }} />
                  </ListItem>
                ))}
              </List>
            </Box>
          </Box>
          <Box
            sx={{
              px: isSmallScreen ? 0.5 : 2,
              textAlign: isSmallScreen ? "center" : "left",
            }}
          >
            <img
              src={board}
              alt="board"
              style={{
                width: "100%",
                maxWidth: isLargeScreen ? "800px" : "674px",
                height: "auto",
                marginTop: 0,
              }}
            />
          </Box>
        </Container>
      </Box>
      <Box
        sx={{
          pt: isSmallScreen ? 1 : isLargeScreen ? 10 : 10,
          pb: 2,
          px: isSmallScreen ? 1 : isLargeScreen ? 4 : 2,
        }}
      >
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            pl: isLargeScreen ? 12 : 0,
            pt: isSmallScreen ? 1 : isLargeScreen ? 3 : 2,
          }}
        >
          <Typography
            variant={isSmallScreen ? "h6" : isLargeScreen ? "h4" : "h5"}
            gutterBottom
            sx={{
              fontWeight: "bold",
              fontSize: isSmallScreen
                ? "1.50rem"
                : isLargeScreen
                ? "2.0rem"
                : "1.50rem",
              textAlign: "center",
              pb: 5,
            }}
          >
            Features for accurate tracking and process optimization
          </Typography>
          <Container
            sx={{
              display: "flex",
              flexDirection: isSmallScreen ? "column" : "row",
              alignItems: "center",
              pt: isSmallScreen ? 1 : isLargeScreen ? 3 : 2,
            }}
          >
            <Box
              sx={{
                px: isSmallScreen ? 1 : 1.5,
                textAlign: isSmallScreen ? "center" : "left",
              }}
            >
              <Typography
                variant={isSmallScreen ? "h6" : isLargeScreen ? "h4" : "h5"}
                gutterBottom
                sx={{
                  fontWeight: "bold",
                  fontSize: isSmallScreen
                    ? "1.25rem"
                    : isLargeScreen
                    ? "1.75rem"
                    : "1.25rem",
                  color: "#110D59",
                }}
              >
                Track Workflows
              </Typography>
              <Typography
                variant={isSmallScreen ? "h6" : isLargeScreen ? "h4" : "h5"}
                gutterBottom
                sx={{
                  fontWeight: "bold",
                  fontSize: isSmallScreen
                    ? "1.25rem"
                    : isLargeScreen
                    ? "1.75rem"
                    : "1.25rem",
                  color: "#110D59",
                }}
              >
                with Projects
              </Typography>
              <Typography
                variant={
                  isSmallScreen ? "body2" : isLargeScreen ? "body1" : "body1"
                }
                gutterBottom
                sx={{
                  fontWeight: "normal",
                  fontSize: isSmallScreen
                    ? "0.850rem"
                    : isLargeScreen
                    ? "0.875rem"
                    : "0.850rem",
                  color: "#110D59",
                }}
              >
                Kanban style board lets you visualize the status of all issues
                quickly and stop bottlenecks in their tracks.
              </Typography>
            </Box>
            <Box
              sx={{
                px: isSmallScreen ? 0.5 : 2,
                textAlign: isSmallScreen ? "center" : "left",
              }}
            >
              <img
                src={ProjectsDetailedView}
                alt="board"
                style={{
                  width: "100%",
                  maxWidth: isLargeScreen ? "800px" : "674px",
                  height: "auto",
                  marginTop: 0,
                }}
              />
            </Box>
          </Container>
        </Container>
      </Box>
      <Box
        sx={{
          pt: isSmallScreen ? 1 : isLargeScreen ? 20 : 20,
          pb: 2,
          px: isSmallScreen ? 1 : isLargeScreen ? 4 : 2,
        }}
      >
        <Container
          sx={{
            display: "flex",
            flexDirection: isSmallScreen ? "column" : "row",
            alignItems: "center",
            pt: isSmallScreen ? 1 : isLargeScreen ? 3 : 2,
          }}
        >
          <Box
            sx={{
              px: isSmallScreen ? 0.5 : 2,
              textAlign: isSmallScreen ? "center" : "left",
            }}
          >
            <img
              src={CalendarView}
              alt="board"
              style={{
                width: "100%",
                maxWidth: isLargeScreen ? "800px" : "674px",
                height: "auto",
                marginTop: 0,
              }}
            />
          </Box>
          <Box
            sx={{
              px: isSmallScreen ? 1 : 1.5,
              textAlign: isSmallScreen ? "center" : "left",
            }}
          >
            <Typography
              variant={isSmallScreen ? "h6" : isLargeScreen ? "h4" : "h5"}
              gutterBottom
              sx={{
                fontWeight: "bold",
                fontSize: isSmallScreen
                  ? "1.25rem"
                  : isLargeScreen
                  ? "1.75rem"
                  : "1.25rem",
                color: "#110D59",
              }}
            >
              Visualize progress
            </Typography>
            <Typography
              variant={isSmallScreen ? "h6" : isLargeScreen ? "h4" : "h5"}
              gutterBottom
              sx={{
                fontWeight: "bold",
                fontSize: isSmallScreen
                  ? "1.25rem"
                  : isLargeScreen
                  ? "1.75rem"
                  : "1.25rem",
                color: "#110D59",
              }}
            >
              with Calendar
            </Typography>
            <Typography
              variant={
                isSmallScreen ? "body2" : isLargeScreen ? "body1" : "body1"
              }
              gutterBottom
              sx={{
                fontWeight: "normal",
                fontSize: isSmallScreen
                  ? "0.850rem"
                  : isLargeScreen
                  ? "0.875rem"
                  : "0.850rem",
                color: "#110D59",
              }}
            >
              Plan tasks and milestones with Gantt charts, and see if you're on
              target with burndown charts.
            </Typography>
          </Box>
        </Container>
      </Box>
      <Box
        sx={{
          pt: isSmallScreen ? 1 : isLargeScreen ? 20 : 20,
          pb: 2,
          px: isSmallScreen ? 1 : isLargeScreen ? 4 : 2,
        }}
      >
        <Container
          sx={{
            display: "flex",
            flexDirection: isSmallScreen ? "column" : "row",
            alignItems: "center",
            pt: isSmallScreen ? 1 : isLargeScreen ? 3 : 2,
          }}
        >
          <Box
            sx={{
              px: isSmallScreen ? 1 : 1.5,
              textAlign: isSmallScreen ? "center" : "left",
            }}
          >
            <Typography
              variant={isSmallScreen ? "h6" : isLargeScreen ? "h4" : "h5"}
              gutterBottom
              sx={{
                fontWeight: "bold",
                fontSize: isSmallScreen
                  ? "1.25rem"
                  : isLargeScreen
                  ? "1.75rem"
                  : "1.25rem",
                color: "#110D59",
              }}
            >
              Take Control with
            </Typography>
            <Typography
              variant={isSmallScreen ? "h6" : isLargeScreen ? "h4" : "h5"}
              gutterBottom
              sx={{
                fontWeight: "bold",
                fontSize: isSmallScreen
                  ? "1.25rem"
                  : isLargeScreen
                  ? "1.75rem"
                  : "1.25rem",
                color: "#110D59",
              }}
            >
              your Workspace
            </Typography>
            <Typography
              variant={
                isSmallScreen ? "body2" : isLargeScreen ? "body1" : "body1"
              }
              gutterBottom
              sx={{
                fontWeight: "normal",
                fontSize: isSmallScreen
                  ? "0.850rem"
                  : isLargeScreen
                  ? "0.875rem"
                  : "0.850rem",
                color: "#110D59",
              }}
            >
              Empower your team with TaskWise's dynamic workspace, enabling
              seamless collaboration and organization
            </Typography>
          </Box>
          <Box
            sx={{
              px: isSmallScreen ? 0.5 : 2,
              textAlign: isSmallScreen ? "center" : "left",
            }}
          >
            <img
              src={WorkspaceView}
              alt="board"
              style={{
                width: "100%",
                maxWidth: isLargeScreen ? "800px" : "674px",
                height: "auto",
                marginTop: 0,
              }}
            />
          </Box>
        </Container>
      </Box>
      {/* Features section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          py: 4,
          px: isSmallScreen ? 2 : 8,
          backgroundColor: "#e0f7fa",
          mt: 10,
        }}
      >
        {features
          .reduce((rows, feature, index) => {
            if (index % 2 === 0) {
              rows.push([]);
            }
            rows[rows.length - 1].push(feature);
            return rows;
          }, [])
          .map((row, rowIndex) => (
            <Box
              key={rowIndex}
              sx={{
                display: "flex",
                flexDirection: isSmallScreen ? "column" : "row",
                justifyContent: "space-around",
                alignItems: "center",
                width: "100%",
                mb: 4,
                pt: 4,
              }}
            >
              {row.map((feature, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    maxWidth: "350px",
                    mb: isSmallScreen ? 4 : 0,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    {feature.icon}
                    <Typography variant="h6" sx={{ fontWeight: "bold", ml: 2 }}>
                      {feature.title}
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {feature.description}
                  </Typography>
                </Box>
              ))}
            </Box>
          ))}
      </Box>
      {/* AI Section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: isSmallScreen ? "12px" : "24px",
          backgroundColor: "#f5f5f5",
          alignItems: isSmallScreen ? "flex-start" : "center", // Center on large screens
          gap: isSmallScreen ? 2 : 4, // Adjust gap based on screen size
        }}
      >
        <Box sx={{ paddingTop: 20 }}>
          <Typography
            variant={isSmallScreen ? "h4" : isLargeScreen ? "h2" : "h3"}
            gutterBottom
            sx={{
              fontWeight: "bold",
              fontSize: isSmallScreen ? "1.50rem" : "2.00rem",
            }}
            align="center"
          >
            Kickstart a project in seconds
          </Typography>
          <Typography
            variant={isSmallScreen ? "body2" : "body1"}
            sx={{
              fontWeight: "bold",
              fontSize: isSmallScreen ? "1.2rem" : "1.225rem",
              lineHeight: 1.4,
              textAlign: "center", // Center the text
            }}
            align="center"
          >
            Taskwise's AI-generated projects encompass essential workflow,
            <br />
            enabling you to launch a new project within moments.
            <br />
            With Taskwise, initiating your project is a breeze.
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            px: isSmallScreen ? 0.5 : 2,
            textAlign: isSmallScreen ? "center" : "left",
            justifyContent: "space-between", // <-- Distribute images evenly
          }}
        >
          <img
            src={AIImage1}
            alt="board"
            style={{
              width: isSmallScreen ? "25%" : "30%", // <-- Adjust width for smaller size
              height: "auto",
              marginTop: 0,
              marginRight: "20px",
            }}
          />
          <img
            src={AIImage2}
            alt="board"
            style={{
              width: isSmallScreen ? "25%" : "30%", // <-- Adjust width for smaller size
              height: "auto",
              marginTop: 0,
              marginRight: "20px",
              marginLeft: "20px",
            }}
          />
          <img
            src={AIImage3}
            alt="board"
            style={{
              width: isSmallScreen ? "25%" : "30%", // <-- Adjust width for smaller size
              height: "auto",
              marginTop: 0,
              marginLeft: "20px",
            }}
          />
        </Box>
      </Box>
      {/* Accordion Section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          py: 4,
          px: isSmallScreen ? 2 : 8,
          backgroundColor: "#ffffff",
        }}
      >
        <Typography
          variant="h5"
          gutterBottom
          sx={{ fontWeight: "bold", textAlign: "center", mb: 4, pt: 10, pb: 4 }}
        >
          Frequently Asked Questions
        </Typography>
        {accordionItems.map((item, index) => (
          <Accordion
            key={index}
            expanded={expanded === `panel${index}`}
            onChange={handleChange(`panel${index}`)}
            sx={{ width: "100%", maxWidth: "800px", mb: 3, p: 2 }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: "bold",
                  color:
                    expanded === `panel${index}`
                      ? "blue"
                      : "inherit !important",
                }}
              >
                {item.title}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2">{item.content}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
      <Box sx={{ backgroundColor: "black", color: "white", py: 3 }}>
        <Container maxWidth="lg">
          <Box
            display="flex"
            flexDirection={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            alignItems="center"
          >
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              mb={{ xs: 2, sm: 0 }}
            >
              <img
                src={Logo}
                alt="Task Wise Logo"
                style={{ width: 100, height: "auto" }}
              />{" "}
              {/* Increased logo size */}
              <Typography
                variant="body2"
                align="center"
                sx={{ fontSize: "0.8rem" }}
              >
                {" "}
                {/* Reduced font size */}
                AI-Powered Task Management Board
              </Typography>
            </Box>
            <Box
              display="flex"
              flexDirection="column"
              alignItems={{ xs: "center", sm: "flex-start" }}
            >
              <Typography variant="h6" gutterBottom sx={{ fontSize: "1rem" }}>
                Products
              </Typography>{" "}
              {/* Reduced font size */}
              <Link
                href="#"
                color="inherit"
                underline="hover"
                sx={{ fontSize: "0.9rem" }}
              >
                {" "}
                {/* Reduced font size */}
                About
              </Link>
              <Link
                href="#"
                color="inherit"
                underline="hover"
                sx={{ fontSize: "0.9rem" }}
              >
                {" "}
                {/* Reduced font size */}
                Support
              </Link>
            </Box>
            <Box
              display="flex"
              flexDirection="column"
              alignItems={{ xs: "center", sm: "flex-start" }}
            >
              <Typography variant="h6" gutterBottom sx={{ fontSize: "1rem" }}>
                Useful Links
              </Typography>{" "}
              {/* Reduced font size */}
              <Link
                href="#"
                color="inherit"
                underline="hover"
                sx={{ fontSize: "0.9rem" }}
              >
                {" "}
                {/* Reduced font size */}
                Privacy Policy
              </Link>
              <Link
                href="#"
                color="inherit"
                underline="hover"
                sx={{ fontSize: "0.9rem" }}
              >
                {" "}
                {/* Reduced font size */}
                Terms of Use
              </Link>
            </Box>
            <Box mt={2} display="flex" justifyContent="center">
              <Link href="https://instagram.com" color="inherit" sx={{ mx: 1 }}>
                <InstagramIcon fontSize="small" /> {/* Reduced icon size */}
              </Link>
              <Link href="https://twitter.com" color="inherit" sx={{ mx: 1 }}>
                <TwitterIcon fontSize="small" /> {/* Reduced icon size */}
              </Link>
            </Box>
          </Box>
        </Container>
      </Box>
    </div>
  );
}

export default LandingPage;
