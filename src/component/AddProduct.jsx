import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Box,
  Grid,
  MenuItem,
  Alert,
  Fade,
  Paper,
  Divider,
} from '@mui/material';
import {
  Add as AddIcon,
  ArrowBack as ArrowBackIcon,
  Save as SaveIcon,
} from '@mui/icons-material';
import productService from "../service/productservice";

const AddProduct = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    productName: "",
    description: "",
    price: "",
    status: "active",
  });

  const [errors, setErrors] = useState({});
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState("success");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const statusOptions = [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'pending', label: 'Pending' },
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!product.productName.trim()) {
      newErrors.productName = 'Product name is required';
    } else if (product.productName.trim().length < 3) {
      newErrors.productName = 'Product name must be at least 3 characters';
    }

    if (!product.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (product.description.trim().length < 10) {
      newErrors.description = 'Description must be at least 10 characters';
    }

    if (!product.price) {
      newErrors.price = 'Price is required';
    } else if (isNaN(product.price) || parseFloat(product.price) <= 0) {
      newErrors.price = 'Price must be a positive number';
    }

    if (!product.status) {
      newErrors.status = 'Status is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      await productService.saveProduct(product);
      setMsg("Product added successfully!");
      setMsgType("success");
      
      // Reset form
      setProduct({
        productName: "",
        description: "",
        price: "",
        status: "active",
      });
      
      // Redirect after a short delay
      setTimeout(() => {
        navigate("/");
      }, 1500);
      
    } catch (error) {
      console.log(error);
      setMsg("Failed to add product. Please try again.");
      setMsgType("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate("/")}
            sx={{ mr: 2, color: 'text.secondary' }}
          >
            Back
          </Button>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
            Add New Product
          </Typography>
        </Box>

        {msg && (
          <Fade in={true}>
            <Alert 
              severity={msgType} 
              sx={{ mb: 3 }}
              onClose={() => setMsg("")}
            >
              {msg}
            </Alert>
          </Fade>
        )}

        <Card sx={{ 
          borderRadius: 3,
          boxShadow: 3,
          overflow: 'hidden',
        }}>
          <Box sx={{ 
            p: 3, 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
          }}>
            <Typography variant="h6" sx={{ fontWeight: 600, display: 'flex', alignItems: 'center' }}>
              <AddIcon sx={{ mr: 1 }} />
              Product Information
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9, mt: 1 }}>
              Fill in the details below to add a new product to your inventory
            </Typography>
          </Box>
          
          <CardContent sx={{ p: 4 }}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Product Name"
                    name="productName"
                    value={product.productName}
                    onChange={handleChange}
                    error={!!errors.productName}
                    helperText={errors.productName}
                    variant="outlined"
                    size="large"
                    placeholder="Enter product name"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Description"
                    name="description"
                    value={product.description}
                    onChange={handleChange}
                    error={!!errors.description}
                    helperText={errors.description}
                    variant="outlined"
                    multiline
                    rows={4}
                    placeholder="Enter product description"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Price"
                    name="price"
                    type="number"
                    value={product.price}
                    onChange={handleChange}
                    error={!!errors.price}
                    helperText={errors.price}
                    variant="outlined"
                    placeholder="0.00"
                    InputProps={{
                      startAdornment: <Typography sx={{ mr: 1, color: 'text.secondary' }}>$</Typography>,
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    select
                    label="Status"
                    name="status"
                    value={product.status}
                    onChange={handleChange}
                    error={!!errors.status}
                    helperText={errors.status}
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                      },
                    }}
                  >
                    {statusOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              </Grid>

              <Divider sx={{ my: 4 }} />

              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                <Button
                  variant="outlined"
                  onClick={() => navigate("/")}
                  sx={{ 
                    borderRadius: 2,
                    px: 4,
                    py: 1.5,
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  startIcon={<SaveIcon />}
                  disabled={isSubmitting}
                  sx={{
                    borderRadius: 2,
                    px: 4,
                    py: 1.5,
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
                      transform: 'translateY(-1px)',
                      boxShadow: 4,
                    },
                    transition: 'all 0.2s ease-in-out',
                  }}
                >
                  {isSubmitting ? 'Adding...' : 'Add Product'}
                </Button>
              </Box>
            </form>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default AddProduct;
