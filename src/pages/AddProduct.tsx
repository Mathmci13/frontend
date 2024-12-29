import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import axios from "axios";

function AddProduct() {
    const [form, setForm] = useState({ name: "", description: "", price: "", quantity: "" });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        axios.post("http://127.0.0.1:8000/products/", form)
            .then(() => alert("Produto adicionado com sucesso!"))
            .catch(error => console.error("Erro ao adicionar o produto:", error));
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2, maxWidth: 400 }}>
            <TextField name="name" label="Nome" onChange={handleChange} required />
            <TextField name="description" label="Descrição" onChange={handleChange} />
            {/* <TextField name="price" label="Preço" onChange={handleChange} type="number" required />
            <TextField name="quantity" label="Quantidade" onChange={handleChange} type="number" required /> */}
            <Box sx={{ display: "flex", gap: 1 }}>
                <TextField
                    name="price"
                    label="Preço"
                    onChange={handleChange}
                    type="number"
                    required
                    sx={{ flex: 2 }}
                />
                <TextField
                    name="quantity"
                    label="Quantidade"
                    onChange={handleChange}
                    type="number"
                    required
                    sx={{ flex: 1 }}
                />
            </Box>
            <Button type="submit" variant="contained" color="primary">Adicionar Produto</Button>
        </Box>
    );
}

export default AddProduct;