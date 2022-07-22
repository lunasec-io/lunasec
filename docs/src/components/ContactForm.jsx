import React from 'react';
import Mailchimp from 'react-mailchimp-form'

export default function ContactForm() {
    return (
        <div className='contact-form-wrapper'>
            <label className='contact-form-label'>Subscribe for updates</label>
            <Mailchimp
                action='https://lunasec.us20.list-manage.com/subscribe/post?u=6e2679c8b83c1b6f20ec7a702&amp;id=92f2f231ea'
                fields={[
                    {
                        name: 'NAME',
                        placeholder: 'Name',
                        type: 'text',
                        required: true
                    },
                    {
                        name: 'EMAIL',
                        placeholder: 'Email',
                        type: 'email',
                        required: true
                    },
                    {
                        name: 'NOTES',
                        placeholder: 'Notes',
                        type: 'text',
                        required: false
                    }
                ].filter(n => n)}
                messages ={
                    {
                        sending: "Sending...",
                        success: "Thank you for subscribing!",
                        error: "An unexpected internal error has occurred.",
                        empty: "You must write an e-mail.",
                        duplicate: "Too many subscribe attempts for this email address",
                        button: "Subscribe"
                    }
                }
                className='contact-form'
            />
        </div>
    );
}
