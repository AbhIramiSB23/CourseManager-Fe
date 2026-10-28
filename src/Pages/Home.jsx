
import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  MenuItem,
  Paper
} from "@mui/material";
import { addDetails } from "../Services/allAPI";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const [course, setCourse] = useState({
    courseName: "",
    trainerName: "",
    duration: "",
    fee: "",
    time: ""
  });

  const updateCourse = (e) => {
    setCourse({
      ...course,
      [e.target.name]: e.target.value
    });
  };

  const onClickSubmit = async (e) => {
    e.preventDefault();

    try {
      const apiResponse = await addDetails(course);

      if (apiResponse.status === 201 || apiResponse.status === 200) {
        toast.success("Course added successfully");

        navigate("/course-details");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const fieldStyle = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "10px",
      bgcolor: "#FFFFFF",
      "& fieldset": {
        borderColor: "#E0E6F0"
      },
      "&:hover fieldset": {
        borderColor: "#A5B4FC"
      },
      "&.Mui-focused fieldset": {
        borderColor: "#405CF5"
      }
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "#405CF5"
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#F5F7FC",
        pb: 8
      }}
    >
      <Box
        sx={{
          bgcolor: "#111B35",
          color: "#FFFFFF",
          pt: { xs: 5, md: 7 },
          pb: { xs: 8, md: 10 },
          borderRadius: { xs: "0 0 24px 24px", md: "0 0 36px 36px" }
        }}
      >
        <Container maxWidth="md">
          <Typography
            sx={{
              color: "#A9B9FF",
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: 3,
              mb: 2
            }}
          >
            COURSE MANAGEMENT
          </Typography>

          <Typography
            sx={{
              fontSize: { xs: 32, md: 46 },
              fontWeight: 750,
              letterSpacing: "-1.5px",
              lineHeight: 1.2
            }}
          >
            Build your learning
            <Box component="span" sx={{ color: "#91A8FF", display: "block" }}>
              experience.
            </Box>
          </Typography>

          <Typography
            sx={{
              color: "#C0C9DB",
              fontSize: 15,
              mt: 2,
              lineHeight: 1.8,
              maxWidth: 500
            }}
          >
            Add and organise your courses with a simple, streamlined
            course management experience.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="md" sx={{ mt: { xs: -4, md: -5 } }}>
        <Paper
          elevation={0}
          sx={{
            border: "1px solid #E5EAF3",
            borderRadius: "18px",
            bgcolor: "#FFFFFF",
            p: { xs: 2.5, sm: 4, md: 5 },
            boxShadow: "0 16px 45px rgba(24, 39, 75, 0.07)"
          }}
        >
          <Box sx={{ mb: 3.5 }}>
            <Typography
              sx={{
                fontSize: 24,
                fontWeight: 750,
                letterSpacing: "-0.5px",
                color: "#18233B"
              }}
            >
              Add New Course
            </Typography>

            <Typography sx={{ color: "#8993A7", fontSize: 14, mt: 1 }}>
              Enter the information below to create a course.
            </Typography>
          </Box>

          <Box
            component="form"
            onSubmit={onClickSubmit}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2.5
            }}
          >
            <Box>
              <Typography
                sx={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#35415A",
                  mb: 1
                }}
              >
                Course Name
              </Typography>

              <TextField
                placeholder="Enter course name"
                name="courseName"
                fullWidth
                required
                value={course.courseName}
                onChange={updateCourse}
                sx={fieldStyle}
              />
            </Box>

            <Box>
              <Typography
                sx={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#35415A",
                  mb: 1
                }}
              >
                Trainer Name
              </Typography>

              <TextField
                placeholder="Enter trainer name"
                name="trainerName"
                fullWidth
                required
                value={course.trainerName}
                onChange={updateCourse}
                sx={fieldStyle}
              />
            </Box>

            <Box>
              <Typography
                sx={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#35415A",
                  mb: 1
                }}
              >
                Course Duration
              </Typography>

              <TextField
                placeholder="e.g. 3 Months"
                name="duration"
                fullWidth
                required
                value={course.duration}
                onChange={updateCourse}
                sx={fieldStyle}
              />
            </Box>

            <Box>
              <Typography
                sx={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#35415A",
                  mb: 1
                }}
              >
                Course Fee
              </Typography>

              <TextField
                placeholder="Enter course fee"
                name="fee"
                type="number"
                fullWidth
                required
                value={course.fee}
                onChange={updateCourse}
                inputProps={{ min: 0 }}
                sx={fieldStyle}
              />
            </Box>

            <Box>
              <Typography
                sx={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#35415A",
                  mb: 1
                }}
              >
                Class Time
              </Typography>

              <TextField
                name="time"
                select
                fullWidth
                required
                value={course.time}
                onChange={updateCourse}
                sx={fieldStyle}
              >
                <MenuItem value="9 AM - 11 AM">
                  9 AM - 11 AM
                </MenuItem>

                <MenuItem value="11 AM - 1 PM">
                  11 AM - 1 PM
                </MenuItem>
              </TextField>
            </Box>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                mt: 1,
                py: 1.6,
                borderRadius: "10px",
                bgcolor: "#405CF5",
                textTransform: "none",
                fontSize: 15,
                fontWeight: 650,
                boxShadow: "none",
                "&:hover": {
                  bgcolor: "#3048D4",
                  boxShadow: "none"
                }
              }}
            >
              Add Course
            </Button>
          </Box>
        </Paper>

        <Typography
          sx={{
            textAlign: "center",
            color: "#929CB0",
            fontSize: 12,
            mt: 3
          }}
        >
          Course Manager · Simple. Organised. Efficient.
        </Typography>
      </Container>
    </Box>
  );
}

export default Home;
