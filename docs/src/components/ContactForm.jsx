import React from 'react';
import Mailchimp from 'react-mailchimp-form'

export default function ContactForm({hideLabel, hideNotes}) {
    return (
        <div className='contact-form-wrapper'>
            {!hideLabel ? <label className='contact-form-label'>Subscribe for updates</label> : null}
            <Mailchimp
                action='https://lunasec.us20.list-manage.com/subscribe/post?u=6e2679c8b83c1b6f20ec7a702&amp;id=92f2f231ea'
                fields={[
                    {
                        name: 'EMAIL',
                        placeholder: 'Email',
                        type: 'email',
                        required: true
                    },
                    {
                        name: 'NAME',
                        placeholder: 'Name (optional)',
                        type: 'text',
                        required: false
                    },
                    !hideNotes ?
                        {
                            name: 'NOTES',
                            placeholder: 'Notes (optional)',
                            type: 'text',
                            required: false
                        } : null,
                ].filter(n => n)}
                messages={
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
