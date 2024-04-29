import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import { Autocomplete, Box, Button, Link, Stack, TextField, Typography } from '@mui/material';
import { useAuth } from 'src/hooks/use-auth';
import { useState } from 'react';
import axios from 'axios';
import { StudentAPI } from 'src/config/api';

export const Page = () => {
    // async function _onSave(){
    //   try {
    //     let res = await axios.post
    //   } catch (e) {
    //     console.log(e , "Error")
    //   }
    // }


    const [dept, setDept] = useState('');
    const router = useRouter();
    const auth = useAuth();
    const formik = useFormik({
        initialValues: {
            email: '',
            name: '',
            rollNo: '',
            phone: '',
            class: "",
            submit: null
        },
        onSubmit: async (values, helpers) => {
            try {
                console.log("cliced");
                let data = {
                    email: values.email,
                    name: values.name,
                    rollNo: values.rollNo,
                    dept,
                    phone: values.phone,
                    class: values.class
                };

                console.log(data, "Data");
                let res = axios.post(StudentAPI, data);
                console.log(res, "RES");
                // await auth.signUp(values.email, values.name, values.password);
                // router.push('/');
            } catch (err) {
                helpers.setStatus({ success: false });
                helpers.setErrors({ submit: err.message });
                helpers.setSubmitting(false);
            }
        }
    });

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
                                <TextField
                                    error={!!(formik.touched.name && formik.errors.name)}
                                    fullWidth
                                    helperText={formik.touched.name && formik.errors.name}
                                    label="Name"
                                    name="name"
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.name} />
                                <TextField
                                    error={!!(formik.touched.email && formik.errors.email)}
                                    fullWidth
                                    helperText={formik.touched.email && formik.errors.email}
                                    label="Email Address"
                                    name="email"
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    type="email"
                                    value={formik.values.email} />

                                <TextField
                                    error={!!(formik.touched.phone && formik.errors.phone)}
                                    fullWidth
                                    helperText={formik.touched.phone && formik.errors.phone}
                                    label="Phone"
                                    name="phone"
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    // type="email"
                                    value={formik.values.phone} />

                                <Autocomplete
                                    options={["IT", "AIDS", "EXTC", "COMP"]}
                                    // multiple
                                    onChange={(e, newValue) => setDept(newValue)}
                                    // getOptionLabel={(s) => s.name}
                                    value={dept}
                                    renderInput={(params) => <TextField {...params} label="Department" />} />
                                <TextField
                                    // error={!!(formik.touched.password && formik.errors.password)}
                                    fullWidth
                                    // helperText={formik.touched.password && formik.errors.password}
                                    label="Class"
                                    name="class"
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    // type="password"
                                    value={formik.values.class} />
                                <TextField
                                    // error={!!(formik.touched.password && formik.errors.password)}
                                    fullWidth
                                    // helperText={formik.touched.password && formik.errors.password}
                                    label="RollNo."
                                    name="rollNo"
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    // type="password"
                                    value={formik.values.rollNo} />
                                <TextField
                                    // error={!!(formik.touched.password && formik.errors.password)}
                                    fullWidth
                                    // helperText={formik.touched.password && formik.errors.password}
                                    label="Password"
                                    name="password"
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    // type="password"
                                    value={formik.values.password} />
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
