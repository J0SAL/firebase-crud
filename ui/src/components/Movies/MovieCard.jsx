import { faDownLong } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card } from 'react-bootstrap';

function MovieCard({ movie }) {

    return (
        <Card className="shadow-sm">

            <Card.Img
                variant="top"
                src={movie.image_url}
                style={{ display: 'block', objectFit: "fill", height: '40vh' }}
            />

            <Card.Body>
                <Card.Title>{movie.name}</Card.Title>
                <a
                    href={movie.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        fontSize: '16px',
                        color: '#007bff',
                        textDecoration: 'none',
                        fontWeight: 'bold',
                    }}
                >
                    Watch/Download
                    <FontAwesomeIcon
                        icon={faDownLong}
                        style={{ margin: "5px 0 0 5px" }}
                    />
                </a>
            </Card.Body>
        </Card>
    );
}

export default MovieCard;