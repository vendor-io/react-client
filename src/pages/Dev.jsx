import { Link } from 'react-router-dom';
import { routes } from '../routes/routes';

function Dev() {
   return (
      <ul>
         {routes.map((route) => {
            if (route.subroutes) {
               return (
                  <li key={route.id}>
                     {route.path}
                     <ul>
                        {route.subroutes.map((subRoute) => {
                           return (
                              <li key={subRoute.id}>
                                 <Link to={`${route.path}/${subRoute.path}`}>{subRoute.name}</Link>
                              </li>
                           );
                        })}
                     </ul>
                  </li>
               );
            }
            return (
               <li key={route.id}>
                  <Link to={route.path}>{route.name}</Link>
               </li>
            );
         })}
      </ul>
   );
}

export default Dev;
