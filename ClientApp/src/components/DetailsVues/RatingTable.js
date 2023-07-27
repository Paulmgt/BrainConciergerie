import React, { useState, useEffect } from "react";
import { Box, Text, Table, Thead, Tr, Th, Tbody, Td, Button } from "@chakra-ui/react";

const RatingDetails = ({ appartementId }) => {
    const [ratingData, setRatingData] = useState(null);
    const [notations, setNotations] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/NotationsApparts`);

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                console.log(data); // log the data to console
                setRatingData(data);
            } catch (error) {
                console.log("Failed to fetch rating data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <Box>
            {ratingData ? (
                <Table variant="simple">
                    <Thead>
                        <Tr>
                            <Th>Id</Th>
                            <Th>Nom du client</Th>
                            <Th>Nom de l'appartement</Th>
                            <Th>Commentaire</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {ratingData.map((notation, index) => (
                            <Tr key={index}>
                                <Td>{notation.id}</Td> {/* Updated */}
                                <Td>{notation.nomClient}</Td> {/* Updated */}
                                <Td>{notation.appartementNom}</Td> {/* Updated */}
                                <Td>{notation.commentaire}</Td> {/* Updated */}
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            ) : (
                <Text>Chargement des données de notation...</Text>
            )}
        </Box>
    );
};

export default RatingDetails;
