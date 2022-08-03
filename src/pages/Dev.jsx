import { routes } from './../routes/routes';
import { Link } from 'react-router-dom';

function Dev() {
   return (
      <ul>
         {routes.map((route, index) => {
            if (route.subroutes) {
               return (
                  <li key={index}>
                     {route.path}
                     <ul>
                        {route.subroutes.map((subRoute, subIndex) => {
                           return (
                              <li key={subIndex}>
                                 <Link to={`${route.path}/${subRoute.path}`}>{subRoute.name}</Link>
                              </li>
                           );
                        })}
                     </ul>
                  </li>
               );
            }
            return (
               <li key={index}>
                  <Link to={route.path}>{route.name}</Link>
               </li>
            );
         })}
      </ul>
   );
}

export default Dev;
