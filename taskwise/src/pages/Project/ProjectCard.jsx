import React from 'react'
import { Card, CardContent, CardMedia, Typography,CardActions,Button } from "@mui/material";
import { useNavigate } from 'react-router-dom';
function ProjectCard({project}) {
    const navigate=useNavigate();
    return (
        <Card 
            sx={{ maxWidth: 240,cursor:"pointer" }}
            onClick={()=>navigate(`/projects/${project.id}`)}   
        >
            <CardMedia
                component="img"
                alt="project image"
                height="100"
                image={project.imgUrl}
               
                
            />
            <CardContent sx={{ paddingBottom: '5px' ,textAlign:"center"}}>
                <Typography gutterBottom variant="h6" component="div" sx={{ fontSize: '1rem' }}>
                    {project.name}
                </Typography>
            </CardContent>
            <CardActions sx={{ paddingTop: '5px' }}>
                <Button size="small" sx={{ fontSize: '0.75rem', padding: '4px 8px' }}>{project.workspace}</Button>
            </CardActions>
        </Card>
    )
}

export default ProjectCard