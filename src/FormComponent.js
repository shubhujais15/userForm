import React, { useState, useEffect } from 'react';
import {
    Button,
    Input,
    Typography,
    Select,
    Option,
    Box,
    FormControl,
    FormLabel,
    FormHelperText,
    Grid,
    Alert,
} from '@mui/joy';
import { useForm, Controller } from 'react-hook-form';

const FormComponent = () => {
    const {
        handleSubmit,
        control,
        reset,
        formState: { errors },
        setValue,
        watch,
    } = useForm({
        defaultValues: {
            firstName: '',
            middleName: '',
            lastName: '',
            dob: '',
            age: '',
            gender: '',
            email: '',
            mobile: '',
            address: ''
        }
    });

    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const dob = watch('dob'); // Watch the dob field for changes

    // Calculate age based on DOB change and set it
    useEffect(() => {
        if (dob) {
            const currentYear = new Date().getFullYear();
            const birthYear = new Date(dob).getFullYear();
            const calculatedAge = currentYear - birthYear;
            setValue('age', calculatedAge);
        }
    }, [dob, setValue]);

    // Handle form submission
    const onSubmit = (data) => {
        console.log(data); // Log form data if valid

        // Show the success message for 6 seconds
        setShowSuccessMessage(true);
        setTimeout(() => setShowSuccessMessage(false), 6000);

        // Clear form fields
        reset();
    };

    return (
        <Box sx={{ width: '100%', maxWidth: 600, mx: 'auto', mt: 5, p: 3, boxShadow: 'md', borderRadius: 'md', bgcolor: 'background.body' }}>
            <Typography level="h4" sx={{ mb: 2 }}>User Information Form</Typography>

            {showSuccessMessage && (
                <Alert color="success" variant="soft" sx={{ mb: 2 }}>
                    Form submitted successfully!
                </Alert>
            )}

            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2}>
                    {/* First Name */}
                    <Grid item xs={12} sm={4}>
                        <FormControl required error={!!errors.firstName}>
                            <FormLabel>First Name</FormLabel>
                            <Controller
                                name="firstName"
                                control={control}
                                rules={{ required: 'First Name is required' }}
                                render={({ field }) => (
                                    <Input {...field} placeholder="First Name" />
                                )}
                            />
                            {errors.firstName && <FormHelperText>{errors.firstName.message}</FormHelperText>}
                        </FormControl>
                    </Grid>

                    {/* Middle Name */}
                    <Grid item xs={12} sm={4}>
                        <FormControl>
                            <FormLabel>Middle Name</FormLabel>
                            <Controller
                                name="middleName"
                                control={control}
                                render={({ field }) => (
                                    <Input {...field} placeholder="Middle Name" />
                                )}
                            />
                        </FormControl>
                    </Grid>

                    {/* Last Name */}
                    <Grid item xs={12} sm={4}>
                        <FormControl required error={!!errors.lastName}>
                            <FormLabel>Last Name</FormLabel>
                            <Controller
                                name="lastName"
                                control={control}
                                rules={{ required: 'Last Name is required' }}
                                render={({ field }) => (
                                    <Input {...field} placeholder="Last Name" />
                                )}
                            />
                            {errors.lastName && <FormHelperText>{errors.lastName.message}</FormHelperText>}
                        </FormControl>
                    </Grid>

                    {/* Date of Birth */}
                    <Grid item xs={12} sm={6}>
                        <FormControl required error={!!errors.dob}>
                            <FormLabel>Date of Birth</FormLabel>
                            <Controller
                                name="dob"
                                control={control}
                                rules={{ required: 'Date of Birth is required' }}
                                render={({ field }) => (
                                    <Input type="date" {...field} />
                                )}
                            />
                            {errors.dob && <FormHelperText>{errors.dob.message}</FormHelperText>}
                        </FormControl>
                    </Grid>

                    {/* Age */}
                    <Grid item xs={12} sm={6}>
                        <FormControl>
                            <FormLabel>Age</FormLabel>
                            <Controller
                                name="age"
                                control={control}
                                render={({ field }) => (
                                    <Input {...field} disabled placeholder="Age will be calculated" />
                                )}
                            />
                        </FormControl>
                    </Grid>

                    {/* Gender */}
                    <Grid item xs={12} sm={6}>
                        <FormControl required error={!!errors.gender}>
                            <FormLabel>Gender</FormLabel>
                            <Controller
                                name="gender"
                                control={control}
                                rules={{ required: 'Gender is required' }}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        value={field.value || ''} // Set the value correctly
                                        onChange={(event, newValue) => field.onChange(newValue)}
                                        placeholder="Select Gender"
                                    >
                                        <Option value="male">Male</Option>
                                        <Option value="female">Female</Option>
                                        <Option value="other">Other</Option>
                                    </Select>
                                )}
                            />
                            {errors.gender && <FormHelperText>{errors.gender.message}</FormHelperText>}
                        </FormControl>
                    </Grid>

                    {/* Email and Mobile Number (Same row) */}
                    <Grid item xs={12} sm={6}>
                        <FormControl required error={!!errors.email}>
                            <FormLabel>Email</FormLabel>
                            <Controller
                                name="email"
                                control={control}
                                rules={{
                                    required: 'Email is required',
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
                                        message: 'Email is not valid'
                                    }
                                }}
                                render={({ field }) => (
                                    <Input {...field} placeholder="example@example.com" />
                                )}
                            />
                            {errors.email && <FormHelperText>{errors.email.message}</FormHelperText>}
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <FormControl required error={!!errors.mobile}>
                            <FormLabel>Mobile Number</FormLabel>
                            <Controller
                                name="mobile"
                                control={control}
                                rules={{
                                    required: 'Mobile Number is required',
                                    pattern: {
                                        value: /^[0-9]{10}$/,
                                        message: 'Mobile Number should be 10 digits'
                                    }
                                }}
                                render={({ field }) => (
                                    <Input {...field} placeholder="1234567890" />
                                )}
                            />
                            {errors.mobile && <FormHelperText>{errors.mobile.message}</FormHelperText>}
                        </FormControl>
                    </Grid>

                    {/* Address */}
                    <Grid item xs={12}>
                        <FormControl required error={!!errors.address}>
                            <FormLabel>Address</FormLabel>
                            <Controller
                                name="address"
                                control={control}
                                rules={{ required: 'Address is required' }}
                                render={({ field }) => (
                                    <Input {...field} multiline rows={3} placeholder="Enter your address" />
                                )}
                            />
                            {errors.address && <FormHelperText>{errors.address.message}</FormHelperText>}
                        </FormControl>
                    </Grid>
                </Grid>

                {/* Submit Button */}
                <Button type="submit" color="primary" variant="solid" sx={{ mt: 3, width: '100%' }}>
                    Submit
                </Button>
            </form>
        </Box>
    );
};

export default FormComponent;
