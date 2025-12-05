//swcontact.tsx

import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";

export default function SwContact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you! We will get back to you soon.");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <Box sx={{ px: { xs: 2, md: 8 }, py: 8, maxWidth: 600, mx: "auto" }}>
      <Typography variant="h3" sx={{ mb: 4, fontWeight: 600, textAlign: "center" }}>
        Contact Us
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <TextField label="Name" name="name" value={form.name} onChange={handleChange} fullWidth required />
        <TextField label="Email" name="email" type="email" value={form.email} onChange={handleChange} fullWidth required />
        <TextField label="Message" name="message" multiline rows={4} value={form.message} onChange={handleChange} fullWidth required />
        <Button type="submit" variant="contained" className="btn-primary">Send Message</Button>
      </Box>
    </Box>
  );
}
