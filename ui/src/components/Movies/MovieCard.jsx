import { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import Skeleton from 'react-loading-skeleton';

function MovieCard({ movie }) {
    const [loading, setLoading] = useState(false);
    const handleImageLoad = () => {
        setLoading(false);
    };

    return (
        <Card className="shadow-sm">
            {loading ? (
                <Skeleton height={200} />
            ) : (
                <Card.Img
                    variant="top"
                    src={movie.image_url}
                    onLoad={handleImageLoad}
                    style={{ display: loading ? 'none' : 'block', objectFit: "fill", height: '40vh' }}
                />
            )}
            <Card.Body>
                {loading ? (
                    <>
                        <Skeleton width={100} count={2} />
                    </>
                ) : (
                    <>
                        <Card.Title>{movie.name}</Card.Title>
                        <Button
                            variant="primary"
                            href={movie.url}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Watch/Download
                        </Button>
                    </>
                )}
            </Card.Body>
        </Card>
    );
}

export default MovieCard;