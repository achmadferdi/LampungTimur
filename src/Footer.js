import React from 'react';
import { Container } from 'react-bootstrap';

function Footer() {
  return (
    <footer className="site-footer">
      <div className="main-footer text-white background-footer">
        <div className="container">
          <div className="row">
            <div className="col-md-4 col-sm-6 col-xs-12">
              <div className="title-footer">
                <h3>Tentang Kami</h3>
              </div>
              <p>
              Dinas Pendidikan merupakan unsur pelaksana otonomi daerah yang dipimpin oleh seorang Kepala Dinas yang berkedudukan di bawah dan bertanggung jawab kepada Bupati melalui Sekretaris Daerah Kabupaten.
              </p>
            </div>
            <div className="col-md-4 col-sm-6 col-xs-12">
              <div className="title-footer">
                <h3>What is Lorem Ipsum?</h3>
              </div>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make
                a type specimen book.
              </p>
            </div>
            <div className="col-md-4 col-sm-6 col-xs-12">
              <div className="title-footer">
                <h3>What is Lorem Ipsum?</h3>
              </div>
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3974.360895135779!2d105.52151881476374!3d-5.045102096338032!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e4090a28340483d%3A0xf5c610a7e2377d15!2sDinas%20Kesehatan%20Kab.%20Lampung%20Timur!5e0!3m2!1sid!2sid!4v1645085786397!5m2!1sid!2sid" 
              width="100%" height="200" allowfullscreen="" loading="lazy"></iframe>
            </div>
          </div>
        </div>
      </div>
      <div className="bottom-footer">
        <div className="container">
          <p>&copy; Copyright 2022. Website Resmi Dinas Kesehatan Kabupaten Lampung Timur | All rights reserved</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
