import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Autocomplete, Box, Button, Link, Stack, TextField, Typography } from '@mui/material';
import { useAuth } from 'src/hooks/use-auth';
import { Layout as AuthLayout } from 'src/layouts/auth/layout';
import { useState } from 'react';
import axios from 'axios';
import { StudentAPI, UploadAPI } from 'src/config/api';
import { FilePicker } from 'src/components/helperFunctions/filepicker';

const Page = () => {


  // async function _onSave(){
  //   try {
  //     let res = await axios.post
  //   } catch (e) {
  //     console.log(e , "Error")
  //   }
  // }

  const [file, setFile] = useState([])


  const [dept, setDept] = useState('')
  const router = useRouter();
  const auth = useAuth();
  const formik = useFormik({
    initialValues: {
      email: '',
      name: '',
      password: '',
      studentId: '',
      phone: '',
      class: "",
      submit: null
    },
    onSubmit: async (values, helpers) => {
      try {
        console.log("cliced")
        let data = {
          email: values.email,
          name: values.name,
          studentId: values.studentId,
          dept,
          image: file[0].name,
          password: values.password,
          phone: values.phone,
          registeredCommitees: [],
          class: values.class
        }
        handleSubmit()
        console.log(data, "Data")
        let res = axios.post(StudentAPI, data)
        console.log(res, "RES")
        // await auth.signUp(values.email, values.name, values.password);
        // router.push('/');
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    }
  });

  const handleSubmit = async (e) => {
    // e.preventDefault();
    const formData = new FormData();
    formData.append('file', file[0].path);

    try {
      const response = await axios.post(UploadAPI, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        console.log('File uploaded successfully');
      } else {
        console.error('Error uploading file');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };


  return (
    <>
      <Head>
        <title>
          Register | CMS
        </title>
      </Head>
      <Box
        sx={{
          flex: '1 1 auto',
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <Box
          sx={{
            maxWidth: 550,
            px: 3,
            py: '100px',
            width: '100%'
          }}
        >
          <div>
            <Stack
              spacing={1}
              sx={{ mb: 3 }}
            >
              <Typography variant="h4">
                Register
              </Typography>
              <Typography
                color="text.secondary"
                variant="body2"
              >
                Already have an account?
                &nbsp;
                <Link
                  component={NextLink}
                  href="/auth/login"
                  underline="hover"
                  variant="subtitle2"
                >
                  Log in
                </Link>
              </Typography>
            </Stack>
            <form
              noValidate
              onSubmit={formik.handleSubmit}
            >
              <Stack spacing={3}>
                <FilePicker
                  files={file}
                  maxFiles={1}
                  buttonLabel={"Upload Image"}
                  id={"Cover Image"}
                  setNewFiles={setFile}
                  filetype={".png,.jpg,.jpeg"}
                />
                <TextField
                  error={!!(formik.touched.name && formik.errors.name)}
                  fullWidth
                  helperText={formik.touched.name && formik.errors.name}
                  label="Name"
                  name="name"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.name}
                />
                <TextField
                  error={!!(formik.touched.email && formik.errors.email)}
                  fullWidth
                  helperText={formik.touched.email && formik.errors.email}
                  label="Email Address"
                  name="email"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="email"
                  value={formik.values.email}
                />

                <TextField
                  error={!!(formik.touched.phone && formik.errors.phone)}
                  fullWidth
                  helperText={formik.touched.phone && formik.errors.phone}
                  label="Phone"
                  name="phone"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  // type="email"
                  value={formik.values.phone}
                />

                <Autocomplete
                  options={["IT", "AIDS", "EXTC", "COMP"]}
                  // multiple
                  onChange={(e, newValue) => setDept(newValue)}
                  // getOptionLabel={(s) => s.name}
                  value={dept}
                  renderInput={(params) => <TextField {...params} label="Department" />}
                />
                <TextField
                  // error={!!(formik.touched.password && formik.errors.password)}
                  fullWidth
                  // helperText={formik.touched.password && formik.errors.password}
                  label="Class"
                  name="class"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  // type="password"
                  value={formik.values.class}
                />
                <TextField
                  // error={!!(formik.touched.password && formik.errors.password)}
                  fullWidth
                  // helperText={formik.touched.password && formik.errors.password}
                  label="Somaiya Student ID."
                  name="studentId"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  // type="password"
                  value={formik.values.studentId}
                />
                <TextField
                  // error={!!(formik.touched.password && formik.errors.password)}
                  fullWidth
                  // helperText={formik.touched.password && formik.errors.password}
                  label="Password"
                  name="password"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="password"
                  value={formik.values.password}
                />
                {/* <TextField
                  error={!!(formik.touched.password && formik.errors.password)}
                  fullWidth
                  helperText={formik.touched.password && formik.errors.password}
                  label="Password"
                  name="password"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="password"
                  value={formik.values.password}
                /> */}
              </Stack>
              {formik.errors.submit && (
                <Typography
                  color="error"
                  sx={{ mt: 3 }}
                  variant="body2"
                >
                  {formik.errors.submit}
                </Typography>
              )}
              <Button
                fullWidth
                size="large"
                sx={{ mt: 3 }}
                type="submit"
                variant="contained"
              >
                Continue
              </Button>
            </form>
          </div>
        </Box>
      </Box>
    </>
  );
};

Page.getLayout = (page) => (
  <AuthLayout>
    {page}
  </AuthLayout>
);

export default Page;
