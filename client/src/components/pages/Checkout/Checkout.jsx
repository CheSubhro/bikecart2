import React, { useState, useEffect } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddressSection from '../AddressSection/AddressSection';
import PaymentSection from '../PaymentSection/PaymentSection'; 
import { useAppContext } from '../../../context/CartContext';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
    const { user } = useAppContext();
    const [expanded, setExpanded] = useState('panel1');
    const navigate = useNavigate();

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    if (!user) {
        return null;
    }

    return (
        <>
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header">
                    <Typography>Information</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <AddressSection />
                </AccordionDetails>
            </Accordion>

            <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2bh-content" id="panel2bh-header">
                    <Typography>Payment</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <PaymentSection />
                </AccordionDetails>
            </Accordion>
        </>
    );
}

export default Checkout;
