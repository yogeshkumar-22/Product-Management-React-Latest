import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Box,
  Button,
  Chip,
  IconButton,
  Alert,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useTheme,
  Tooltip,
  Fade,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Visibility as ViewIcon,
} from '@mui/icons-material';
import productService from "../service/productservice";

const Home = () => {
  const [productList, setProductList] = useState([]);
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState("success");
  const theme = useTheme();

  useEffect(() => {
    init();
  }, []);

  const init = () => {
    productService
      .getAllProduct()
      .then((res) => {
        setProductList(res.data);
      })
      .catch((error) => {
        console.log(error);
        setMsg("Failed to load products");
        setMsgType("error");
      });
  };

  const deleteProduct = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      productService
        .deleteProduct(id)
        .then(() => {
          setMsg("Product deleted successfully");
          setMsgType("success");
          init();
        })
        .catch((error) => {
          console.log(error);
          setMsg("Failed to delete product");
          setMsgType("error");
        });
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return 'success';
      case 'inactive':
        return 'error';
      case 'pending':
        return 'warning';
      default:
        return 'default';
    }
  };

  const formatPrice = (price) => {
    return `$${parseFloat(price).toFixed(2)}`;
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
            Product Dashboard
          </Typography>
          <Button
            component={Link}
            to="/addProduct"
            variant="contained"
            startIcon={<AddIcon />}
            sx={{
              borderRadius: 2,
              px: 3,
              py: 1.5,
              boxShadow: 2,
              '&:hover': {
                boxShadow: 4,
                transform: 'translateY(-1px)',
              },
              transition: 'all 0.2s ease-in-out',
            }}
          >
            Add New Product
          </Button>
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

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ 
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              '&:hover': { transform: 'translateY(-4px)', boxShadow: 4 },
              transition: 'all 0.3s ease',
            }}>
              <CardContent>
                <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                  {productList.length}
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.9 }}>
                  Total Products
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ 
              background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
              color: 'white',
              '&:hover': { transform: 'translateY(-4px)', boxShadow: 4 },
              transition: 'all 0.3s ease',
            }}>
              <CardContent>
                <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                  {productList.filter(p => p.status?.toLowerCase() === 'active').length}
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.9 }}>
                  Active Products
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ 
              background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
              color: 'white',
              '&:hover': { transform: 'translateY(-4px)', boxShadow: 4 },
              transition: 'all 0.3s ease',
            }}>
              <CardContent>
                <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                  {productList.filter(p => p.status?.toLowerCase() === 'inactive').length}
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.9 }}>
                  Inactive Products
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ 
              background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
              color: 'white',
              '&:hover': { transform: 'translateY(-4px)', boxShadow: 4 },
              transition: 'all 0.3s ease',
            }}>
              <CardContent>
                <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                  {productList.filter(p => p.status?.toLowerCase() === 'pending').length}
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.9 }}>
                  Pending Products
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Products Table */}
        <Card sx={{ 
          borderRadius: 3,
          overflow: 'hidden',
          boxShadow: theme.palette.mode === 'dark' ? 3 : 1,
        }}>
          <CardContent sx={{ p: 0 }}>
            <Box sx={{ p: 3, borderBottom: `1px solid ${theme.palette.divider}` }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                All Products
              </Typography>
            </Box>
            
            <TableContainer component={Paper} elevation={0}>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: 'action.hover' }}>
                    <TableCell sx={{ fontWeight: 600 }}>#</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Product Name</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Description</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Price</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                    <TableCell sx={{ fontWeight: 600, textAlign: 'center' }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {productList.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} sx={{ textAlign: 'center', py: 4 }}>
                        <Typography variant="body1" color="text.secondary">
                          No products found. Add your first product to get started!
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ) : (
                    productList.map((product, index) => (
                      <TableRow 
                        key={product.id}
                        sx={{ 
                          '&:hover': { 
                            backgroundColor: 'action.hover',
                            transition: 'background-color 0.2s ease',
                          },
                        }}
                      >
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>
                          <Typography variant="body1" sx={{ fontWeight: 500 }}>
                            {product.productName}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography 
                            variant="body2" 
                            color="text.secondary"
                            sx={{ 
                              maxWidth: 200,
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            {product.description}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body1" sx={{ fontWeight: 600, color: 'success.main' }}>
                            {formatPrice(product.price)}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={product.status || 'Unknown'}
                            color={getStatusColor(product.status)}
                            size="small"
                            sx={{ fontWeight: 500 }}
                          />
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                            <Tooltip title="Edit Product">
                              <IconButton
                                component={Link}
                                to={`/editProduct/${product.id}`}
                                size="small"
                                sx={{ 
                                  color: 'primary.main',
                                  '&:hover': { backgroundColor: 'primary.light', color: 'white' },
                                }}
                              >
                                <EditIcon />
                              </IconButton>
                            </Tooltip>
                            
                            <Tooltip title="Delete Product">
                              <IconButton
                                onClick={() => deleteProduct(product.id)}
                                size="small"
                                sx={{ 
                                  color: 'error.main',
                                  '&:hover': { backgroundColor: 'error.light', color: 'white' },
                                }}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </Tooltip>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default Home;
