import { routes } from './../routes/routes';
import { Link } from 'react-router-dom';

function Dev() {
   return (
      <ul>
         {routes.map((route, index) => (
            <li key={index}>
               <Link to={route.path}>{route.name}</Link>
            </li>
         ))}
      </ul>
   );
}

export default Dev;
