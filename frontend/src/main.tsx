import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from './pages/Routes/routes.tsx'
import GlobalStyle from './GlobalStyles.ts'
import { AdminProvider } from './context/AdminContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <AdminProvider>
    <GlobalStyle />
    <RouterProvider router={router} />
  </AdminProvider>
)