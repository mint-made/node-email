import React, { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import axios from 'axios';

function App() {
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const formSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = {
      email,
      subject,
      message,
    };
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await axios.post(`/api/email`, formData, config);
    console.log(response);
  };

  return (
    <>
      <Container className='p-3'>
        <h2 className='text-center mb-3'>Sending Emails with Node</h2>

        <Container className='p-3 border rounded' style={{ maxWidth: '600px' }}>
          <h5>Send an email to yourself</h5>
          <Form onSubmit={(e) => formSubmitHandler(e)}>
            <Form.Group className='mb-3'>
              <Form.Control
                type='text'
                placeholder='Your Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Control
                type='text'
                placeholder='Subject'
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Control
                as='textarea'
                placeholder='Message'
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </Form.Group>
            <Button type='submit'>Send</Button>
          </Form>
        </Container>
      </Container>
    </>
  );
}

export default App;
