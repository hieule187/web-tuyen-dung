import React from 'react';
import './styles.css';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import { imgUrl } from '../../../contexts/constants';
import { Link } from 'react-router-dom';
import convertSlugUrl from '../../../utils/convertSlugUrl';

const InfoRecruitment = ({ recruitment }) => {
  return (
    <Card className="shadow-card">
      <div className="m-3">
        <div className="d-flex">
          <Card.Img
            variant="left"
            src={`${imgUrl}/${recruitment.img}`}
            width={50}
            height={50}
            className="rounded no-select"
          />
          <Card.Title className="title-card ms-3">
            <Link
              to={`/recruitment/${convertSlugUrl(recruitment.title)}/${
                recruitment._id
              }`}
              target="_blank"
              style={{ textDecoration: 'none', color: '#212529' }}
            >
              <p className="title-job fw-bold">{recruitment.title}</p>
            </Link>
            <p className="title-company">{recruitment.companyName}</p>
          </Card.Title>
        </div>

        <div className="d-flex mt-2">
          <Badge className="bg-secondary fw-normal text-capitalize">
            {recruitment.salary}
          </Badge>
          <Badge className="bg-secondary fw-normal ms-2">
            {recruitment.location}
          </Badge>
        </div>
      </div>
    </Card>
  );
};

export default InfoRecruitment;
