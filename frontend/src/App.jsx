import "./App.css";

function App() {
  return (
    <div className="login-page">
      <div className="login-card">
        <div className="brand">
          <div className="brand-logo">C</div>
          <div>
            <h1>CaseSync AI</h1>
            <p>Smart case management</p>
          </div>
        </div>

        <div className="login-content">
          <h2>Welcome back</h2>
          <p className="subtitle">
            Sign in to continue to your dashboard
          </p>

          <form>
            <label>Email address</label>
            <input
              type="email"
              placeholder="Enter your email"
            />

            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
            />

            <div className="form-row">
              <label className="remember">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>

              <a href="#">Forgot password?</a>
            </div>

            <button type="submit">Sign in</button>
          </form>

          <div className="divider">
            <span>or</span>
          </div>

          <button className="google-btn" type="button">
            Continue with Google
          </button>

          <p className="signup">
            Don't have an account? <a href="#">Create account</a>
          </p>
        </div>
      </div>

      <div className="login-info">
        <div className="info-badge">AI Powered</div>
        <h2>Manage cases.<br />Work smarter.</h2>
        <p>
          Organize, track and manage your cases efficiently
          with CaseSync AI.
        </p>
      </div>
    </div>
  );
}

export default App;