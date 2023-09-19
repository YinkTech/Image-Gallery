
import SignIn from '../components/SignIn'
import Signup from '../components/Signup'
import { AuthDetails } from '../components/auth/AuthDetails'

function App() {

  return (
    <div>
       <Signup />
       <div>
        <SignIn />
       </div>
       <AuthDetails />
    </div>
  )
}

export default App
