import React, { useState } from 'react';
import { Alert, Button, Container, Form, Spinner } from 'react-bootstrap';
import axios from 'axios';

function App() {
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [messageSent, setMessageSent] = useState({
    email: '',
    subject: '',
    message: '',
  });
  const formSubmitHandler = async (e) => {
    e.preventDefault();
    if (!email || !subject || !message) {
      alert('Please enter an Email, Subject & Message');
      return;
    }
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
    setLoading(true);
    await axios.post(`/api/email`, formData, config);
    setMessageSent(formData);
    setShowForm(true);
    setEmail('');
    setMessage('');
    setSubject('');
    setLoading(false);
  };

  function AlertDismissible() {
    return (
      <>
        <Alert show={showForm} variant='success'>
          <Alert.Heading>
            Message sent to <i>{messageSent.email}</i>
          </Alert.Heading>
          <p>Subject: {messageSent.subject}</p>
          <p>Message: {messageSent.message}</p>
          <hr />
          <div className='d-flex justify-content-end'>
            <Button
              onClick={() => setShowForm(false)}
              variant='outline-success'
              className='btn-sm'
            >
              Close
            </Button>
          </div>
        </Alert>
      </>
    );
  }

  return (
    <>
      <Container className='p-3'>
        <h2 className='text-center mb-3'>Sending Emails with Node</h2>
        {showForm ? (
          <AlertDismissible />
        ) : !showForm && loading ? (
          <div className='d-flex justify-content-center'>
            <Spinner animation='border' variant='primary' />
          </div>
        ) : (
          <Container
            className='p-3 border rounded'
            style={{ maxWidth: '600px' }}
          >
            <h5>Send an email to yourself</h5>
            <Form onSubmit={(e) => formSubmitHandler(e)}>
              <Form.Group className='mb-3'>
                <Form.Control
                  type='email'
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
        )}
      </Container>
    </>
  );
}

export default App;
