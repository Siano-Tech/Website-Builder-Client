import { useState } from 'react'
import {
  Dialog,
  DialogPanel
} from '@headlessui/react'
import {
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { getUser, isLoggedIn, onLogout } from '../utils/Utils'
import { ArrowRightStartOnRectangleIcon } from '@heroicons/react/24/solid'
import logo from '../assets/apple-touch-icon.png'

const routes = [
  {
    label: 'Sign Up',
    to: '/login',
    isHidden: isLoggedIn()
  },
  {
    label: getUser() ? getUser().phoneNo : '',
    to: '',
    type: 'profile',
    isHidden: !isLoggedIn()
  }
]

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  let location = useLocation();
  let navigate = useNavigate();

  const logout = () => {
    navigate('/');
    onLogout();
    window.location.reload();
  }

  if(location && (location.pathname === "/" || location.pathname === "/website/")) {
    return null
  }

  return (
    <header className="bg-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link to={"/"} className="-m-1.5 p-1.5 flex items-center">
            <span className="sr-only">Website Builder</span>
            <img className="h-8 sm:h-16 w-auto" src={logo} alt="digiclinic-website-builder" />
            <h1 className="text-xl sm:text-2xl ml-3 font-bold tracking-tight text-gray-900">Website Builder</h1>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {routes.map((e) => 
            !e.isHidden && <Link to={e.to} key={e.label} className="flex text-sm font-semibold leading-6 text-gray-900 pr-5">
              {e.label}
              {e?.type === 'profile' && <ArrowRightStartOnRectangleIcon className="ml-2 h-6 w-6" onClick={logout}  />}
            </Link>
          )}
        </div>
      </nav>
      <Dialog className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                className="h-8 w-auto"
                src={logo}
                alt="digiclinic-website-builder"
              />
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="py-6">
                {routes.map((e) => 
                  !e.isHidden && <Link 
                    to={e.to} key={e.label} 
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex -mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    {e.label}
                    {e?.type === 'profile' && <ArrowRightStartOnRectangleIcon className="ml-5 h-6 w-6" onClick={logout} />}
                  </Link>
                )}
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  )
}
