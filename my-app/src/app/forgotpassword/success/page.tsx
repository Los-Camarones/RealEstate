import React from 'react';
import Link from 'next/link';

const success = () => {
  return (
    <div>Thanks - if you have an account with us, we've sent you an email.
        <Link href="/Sign-in"><button>Return to sign in</button></Link>
    </div>

  )
}

export default success;