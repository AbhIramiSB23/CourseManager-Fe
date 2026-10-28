
import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Modal,
  Divider,
  Chip
} from "@mui/material";
import {
  getDetails,
  deleteDetails,
  updateDetails
} from "../Services/allAPI";
import { toast } from "react-toastify";

function CourseDetails() {
  const [courses, setCourses] = useState([]);
  const [duplicateData, setDuplicateData] = useState([]);
  const [searchVal, setSearchValue] = useState("");
  const [open, setOpen] = useState(false);

  const [selectedCourse, setSelectedCourse] = useState({
    id: "",
    courseName: "",
    trainerName: "",
    duration: "",
    fee: "",
    time: ""
  });

  useEffect(() => {
    getCourses();
  }, []);

  const getCourses = async () => {
    try {
      const apiRes = await getDetails();

      if (apiRes.status === 200) {
        const data = apiRes.data.filter(
          (course) =>
            course.courseName &&
            course.courseName.trim() !== ""
        );

        setDuplicateData(data);
        setCourses(data);
      }
    } catch (error) {
      toast.error("Failed to load courses");
    }
  };

  const onClickDelete = async (id) => {
    try {
      const res = await deleteDetails(id);

      if (res.status === 200 || res.status === 204) {
        toast.success("Course deleted successfully");
        await getCourses();
      } else {
        toast.error("Delete failed");
      }
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  useEffect(() => {
    const filteredData = duplicateData.filter((course) =>
      (course.courseName || "")
        .toLowerCase()
        .includes(searchVal.toLowerCase())
    );

    setCourses(filteredData);
  }, [searchVal, duplicateData]);

  const onEditClick = (course) => {
    setSelectedCourse({ ...course });
    setOpen(true);
  };

  const onUpdateClick = async () => {
    try {
      const res = await updateDetails(
        selectedCourse.id,
        selectedCourse
      );

      if (res.status === 200 || res.status === 204) {
        toast.success("Course updated successfully");
        setOpen(false);
        await getCourses();
      } else {
        toast.error("Update failed");
      }
    } catch (error) {
      toast.error("Update failed");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#F5F7FC",
        color: "#172033",
        pb: 8
      }}
    >
      <Box
        sx={{
          bgcolor: "#111B35",
          color: "#FFFFFF",
          pt: { xs: 5, md: 7 },
          pb: { xs: 6, md: 8 },
          borderRadius: { xs: "0 0 24px 24px", md: "0 0 36px 36px" }
        }}
      >
        <Container maxWidth="lg">
          <Typography
            sx={{
              color: "#A9B9FF",
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: 3,
              mb: 2
            }}
          >
            LEARNING MANAGEMENT
          </Typography>

          <Typography
            sx={{
              fontSize: { xs: 32, md: 46 },
              fontWeight: 750,
              letterSpacing: "-1.5px",
              lineHeight: 1.15,
              maxWidth: 600
            }}
          >
            Manage your courses.
            <Box component="span" sx={{ color: "#91A8FF", display: "block" }}>
              Simplify your workflow.
            </Box>
          </Typography>

          <Typography
            sx={{
              color: "#C0C9DB",
              fontSize: { xs: 14, md: 16 },
              mt: 2,
              maxWidth: 520,
              lineHeight: 1.8
            }}
          >
            A smarter way to organise course information, track details,
            and manage your learning programmes.
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 2,
              mt: 4
            }}
          >
            <Box
              sx={{
                bgcolor: "#202D4C",
                border: "1px solid #344363",
                borderRadius: "14px",
                px: 3,
                py: 2,
                minWidth: 150
              }}
            >
              <Typography sx={{ color: "#B6C3DE", fontSize: 12 }}>
                TOTAL COURSES
              </Typography>
              <Typography sx={{ fontSize: 29, fontWeight: 700, mt: 0.5 }}>
                {duplicateData.length}
              </Typography>
            </Box>

            <Box
              sx={{
                bgcolor: "#202D4C",
                border: "1px solid #344363",
                borderRadius: "14px",
                px: 3,
                py: 2,
                minWidth: 150
              }}
            >
              <Typography sx={{ color: "#B6C3DE", fontSize: 12 }}>
                STATUS
              </Typography>
              <Typography sx={{ fontSize: 22, fontWeight: 650, mt: 1 }}>
                Active
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ mt: { xs: -2, md: -3 } }}>
        <Box
          sx={{
            bgcolor: "#FFFFFF",
            p: { xs: 2, md: 3 },
            borderRadius: "18px",
            border: "1px solid #E8ECF4",
            boxShadow: "0 10px 35px rgba(24, 39, 75, 0.05)",
            mb: 4,
            display: "flex",
            justifyContent: "space-between",
            alignItems: { xs: "stretch", md: "center" },
            flexDirection: { xs: "column", md: "row" },
            gap: 2
          }}
        >
          <Box>
            <Typography sx={{ fontSize: 20, fontWeight: 700, color: "#172033" }}>
              Your courses
            </Typography>
            <Typography sx={{ fontSize: 13, color: "#8791A5", mt: 0.5 }}>
              Browse and manage your course collection
            </Typography>
          </Box>

          <TextField
            placeholder="Search courses..."
            size="small"
            value={searchVal}
            onChange={(e) => setSearchValue(e.target.value)}
            sx={{
              width: { xs: "100%", md: 280 },
              "& .MuiOutlinedInput-root": {
                bgcolor: "#F8FAFD",
                borderRadius: "10px",
                fontSize: 14,
                "& fieldset": { borderColor: "#E2E7F0" },
                "&:hover fieldset": { borderColor: "#A7B5D2" },
                "&.Mui-focused fieldset": { borderColor: "#526DF5" }
              }
            }}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2.5
          }}
        >
          <Typography sx={{ fontSize: 14, fontWeight: 700, color: "#34405A" }}>
            COURSE DIRECTORY
          </Typography>

          <Chip
            label={`${courses.length} results`}
            size="small"
            sx={{
              bgcolor: "#E9EDFF",
              color: "#4058C8",
              fontWeight: 600,
              borderRadius: "7px"
            }}
          />
        </Box>

        <Grid container spacing={2.5}>
          {courses.map((course, index) => (
            <Grid item xs={12} sm={6} md={4} key={course.id}>
              <Card
                elevation={0}
                sx={{
                  height: "100%",
                  border: "1px solid #E5EAF3",
                  borderRadius: "16px",
                  bgcolor: "#FFFFFF",
                  overflow: "hidden",
                  transition: "0.2s ease",
                  "&:hover": {
                    borderColor: "#BCC8FF",
                    boxShadow: "0 12px 30px rgba(30, 48, 100, 0.08)",
                    transform: "translateY(-3px)"
                  }
                }}
              >
                <Box
                  sx={{
                    height: 5,
                    background: index % 2 === 0
                      ? "linear-gradient(90deg, #536DFE, #8B9BFF)"
                      : "linear-gradient(90deg, #273C75, #647CEB)"
                  }}
                />

                <CardContent
                  sx={{
                    p: 2.7,
                    "&:last-child": { pb: 2.7 }
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: 10,
                      letterSpacing: 1.8,
                      color: "#7181BB",
                      fontWeight: 800,
                      mb: 1.5
                    }}
                  >
                    COURSE {String(index + 1).padStart(2, "0")}
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: 21,
                      fontWeight: 750,
                      letterSpacing: "-0.5px",
                      color: "#18233B",
                      lineHeight: 1.4,
                      minHeight: 58,
                      overflowWrap: "anywhere"
                    }}
                  >
                    {course.courseName}
                  </Typography>

                  <Divider sx={{ my: 2.5, borderColor: "#EEF1F6" }} />

                  <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <Box>
                      <Typography sx={{ fontSize: 12, color: "#929CB0", mb: 0.5 }}>
                        TRAINER
                      </Typography>
                      <Typography sx={{ fontSize: 14, fontWeight: 600, color: "#35415A" }}>
                        {course.trainerName || "-"}
                      </Typography>
                    </Box>

                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography sx={{ fontSize: 12, color: "#929CB0", mb: 0.5 }}>
                          DURATION
                        </Typography>
                        <Typography sx={{ fontSize: 14, fontWeight: 600, color: "#35415A" }}>
                          {course.duration || "-"}
                        </Typography>
                      </Grid>

                      <Grid item xs={6}>
                        <Typography sx={{ fontSize: 12, color: "#929CB0", mb: 0.5 }}>
                          CLASS TIME
                        </Typography>
                        <Typography sx={{ fontSize: 14, fontWeight: 600, color: "#35415A" }}>
                          {course.time || "-"}
                        </Typography>
                      </Grid>
                    </Grid>

                    <Box
                      sx={{
                        bgcolor: "#F5F7FF",
                        border: "1px solid #E8ECFF",
                        borderRadius: "11px",
                        px: 2,
                        py: 1.5
                      }}
                    >
                      <Typography sx={{ fontSize: 11, color: "#7886B7", mb: 0.5 }}>
                        COURSE FEE
                      </Typography>
                      <Typography sx={{ fontSize: 24, fontWeight: 750, color: "#263D99" }}>
                        ₹{course.fee || "0"}
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: "flex", gap: 1.5, mt: 2.5 }}>
                    <Button
                      variant="contained"
                      fullWidth
                      onClick={() => onEditClick(course)}
                      sx={{
                        textTransform: "none",
                        fontSize: 13,
                        fontWeight: 650,
                        borderRadius: "9px",
                        py: 1.1,
                        bgcolor: "#405CF5",
                        boxShadow: "none",
                        "&:hover": {
                          bgcolor: "#3048D4",
                          boxShadow: "none"
                        }
                      }}
                    >
                      Edit Course
                    </Button>

                    <Button
                      variant="outlined"
                      fullWidth
                      onClick={() => onClickDelete(course.id)}
                      sx={{
                        textTransform: "none",
                        fontSize: 13,
                        fontWeight: 600,
                        borderRadius: "9px",
                        py: 1.1,
                        color: "#C34455",
                        borderColor: "#E8CFD4",
                        "&:hover": {
                          bgcolor: "#FFF6F7",
                          borderColor: "#C34455"
                        }
                      }}
                    >
                      Delete
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {courses.length === 0 && (
          <Box
            sx={{
              textAlign: "center",
              py: 8,
              bgcolor: "#FFFFFF",
              border: "1px solid #E5EAF3",
              borderRadius: "16px"
            }}
          >
            <Typography sx={{ fontSize: 19, fontWeight: 700, color: "#26324A" }}>
              No courses found
            </Typography>
            <Typography sx={{ color: "#8993A7", fontSize: 14, mt: 1 }}>
              Try a different search term.
            </Typography>
          </Box>
        )}
      </Container>

      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "92%", sm: 440 },
            maxWidth: 440,
            maxHeight: "90vh",
            overflowY: "auto",
            bgcolor: "#FFFFFF",
            border: "1px solid #E4E9F2",
            borderRadius: "18px",
            p: { xs: 2.5, sm: 3.5 },
            outline: "none",
            boxShadow: "0 24px 70px rgba(15, 23, 42, 0.18)"
          }}
        >
          <Typography sx={{ fontSize: 25, fontWeight: 750, color: "#18233B" }}>
            Edit Course
          </Typography>

          <Typography sx={{ fontSize: 13, color: "#8993A7", mt: 1, mb: 3 }}>
            Make changes to your course details.
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {[
              ["Course Name", "courseName"],
              ["Trainer Name", "trainerName"],
              ["Duration", "duration"],
              ["Course Fee", "fee"],
              ["Class Time", "time"]
            ].map(([label, field]) => (
              <TextField
                key={field}
                label={label}
                size="small"
                fullWidth
                value={selectedCourse[field] || ""}
                onChange={(e) =>
                  setSelectedCourse({
                    ...selectedCourse,
                    [field]: e.target.value
                  })
                }
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "9px"
                  }
                }}
              />
            ))}
          </Box>

          <Button
            variant="contained"
            fullWidth
            onClick={onUpdateClick}
            sx={{
              mt: 3,
              py: 1.3,
              textTransform: "none",
              fontWeight: 650,
              borderRadius: "9px",
              bgcolor: "#405CF5",
              boxShadow: "none",
              "&:hover": {
                bgcolor: "#3048D4",
                boxShadow: "none"
              }
            }}
          >
            Save Changes
          </Button>

          <Button
            fullWidth
            onClick={() => setOpen(false)}
            sx={{
              mt: 1,
              py: 1,
              textTransform: "none",
              color: "#68758D",
              fontWeight: 600
            }}
          >
            Cancel
          </Button>
        </Box>
      </Modal>
    </Box>
  );
}

export default CourseDetails;
