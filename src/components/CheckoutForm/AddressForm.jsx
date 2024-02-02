import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, InputGroup } from 'react-bootstrap';
import { useForm, FormProvider } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { commerce } from '../../lib/commerce';

import CustomTextField from './CustomTextField';

const AddressForm = ({ checkoutToken, test }) => {
  const [shippingCountries, setShippingCountries] = useState([]);
  const [shippingCountry, setShippingCountry] = useState('');
  const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
  const [shippingSubdivision, setShippingSubdivision] = useState('');
  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingOption, setShippingOption] = useState('');
  const methods = useForm();

  const fetchShippingCountries = async (checkoutTokenId) => {
    const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId);

    setShippingCountries(countries);
    setShippingCountry(Object.keys(countries)[0]);
  };

  const fetchSubdivisions = async (countryCode) => {
    const { subdivisions } = await commerce.services.localeListSubdivisions(countryCode);

    setShippingSubdivisions(subdivisions);
    setShippingSubdivision(Object.keys(subdivisions)[0]);
  };

  const fetchShippingOptions = async (checkoutTokenId, country, stateProvince = null) => {
    const options = await commerce.checkout.getShippingOptions(checkoutTokenId, { country, region: stateProvince });

    setShippingOptions(options);
    setShippingOption(options[0].id);
  };

  useEffect(() => {
    fetchShippingCountries(checkoutToken.id);
  }, []);

  useEffect(() => {
    if (shippingCountry) fetchSubdivisions(shippingCountry);
  }, [shippingCountry]);

  useEffect(() => {
    if (shippingSubdivision) fetchShippingOptions(checkoutToken.id, shippingCountry, shippingSubdivision);
  }, [shippingSubdivision]);

  return (
    <>
      <h6>Shipping address</h6>
      <FormProvider {...methods}>
        <Form onSubmit={methods.handleSubmit((data) => test({ ...data, shippingCountry, shippingSubdivision, shippingOption }))}>
          <Row>
            <Col xs={12} md={6}>
              <CustomTextField required name="firstName" label="First name" />
            </Col>
            <Col xs={12} md={6}>
              <CustomTextField required name="lastName" label="Last name" />
            </Col>
            <Col xs={12}>
              <CustomTextField required name="address1" label="Address line 1" />
            </Col>
            <Col xs={12} md={6}>
              <CustomTextField required name="email" label="Email" />
            </Col>
            <Col xs={12} md={6}>
              <CustomTextField required name="city" label="City" />
            </Col>
            <Col xs={12} md={6}>
              <CustomTextField required name="zip" label="Zip / Postal code" />
            </Col>
            <Col xs={12} md={6}>
              <Form.Group>
                <Form.Label>Shipping Country</Form.Label>
                <Form.Control as="select" value={shippingCountry} onChange={(e) => setShippingCountry(e.target.value)}>
                  {Object.entries(shippingCountries).map(([code, name]) => (
                    <option key={code} value={code}>{name}</option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>
            <Col xs={12} md={6}>
              <Form.Group>
                <Form.Label>Shipping Subdivision</Form.Label>
                <Form.Control as="select" value={shippingSubdivision} onChange={(e) => setShippingSubdivision(e.target.value)}>
                  {Object.entries(shippingSubdivisions).map(([code, name]) => (
                    <option key={code} value={code}>{name}</option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>
            <Col xs={12} md={6}>
              <Form.Group>
                <Form.Label>Shipping Options</Form.Label>
                <Form.Control as="select" value={shippingOption} onChange={(e) => setShippingOption(e.target.value)}>
                  {shippingOptions.map((sO) => (
                    <option key={sO.id} value={sO.id}>{`${sO.description} - (${sO.price.formatted_with_symbol})`}</option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <br />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button as={Link} variant="outline-primary" to="/cart">Back to Cart</Button>
            <Button type="submit" variant="primary">Next</Button>
          </div>
        </Form>
      </FormProvider>
    </>
  );
};

export default AddressForm;
