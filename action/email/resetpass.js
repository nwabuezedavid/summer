 

export const resEtpassemail = (resetUrl) => {
  return (
   <div className="max-w-md mx-auto p-8 bg-white rounded-lg shadow-md">
    <h2 className="text-2xl font-bold mb-4">Reset Your Password</h2>
    <p className="text-gray-600 mb-6">
      You recently requested a password reset for your account. No worries, we've got you covered!
    </p>
    <a
      href={resetUrl}
      target="_blank"
      className="inline-block px-6 py-3 bg-blue-600 text-white text-lg font-medium rounded-lg hover:bg-blue-700 transition-colors"
    >
      Reset Password
    </a>
    <p className="text-gray-500 mt-6 text-sm">
      If you didn't request this, you can safely ignore this email.
    </p>
    <hr className="my-6 border-gray-200" />
    <footer className="text-center text-gray-400 text-xs">
      <p>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
      <p>
        <a href="#" className="text-blue-400 hover:text-blue-600">
          Terms
        </a>
        {' | '}
        <a href="#" className="text-blue-400 hover:text-blue-600">
          Privacy
        </a>
      </p>
    </footer>
  </div>
  )
}
