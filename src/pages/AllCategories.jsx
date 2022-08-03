import { useState, useEffect } from 'react';
import { CategoryList } from '../components/CategoryList';
import { useAuth } from '../hooks/useAuth';
import { useCategory } from './../hooks/useCategory';

function AllCategories() {
   const [categories, setCategories] = useState([]);
   const [isLoading, setIsLoading] = useState(true);

   const { token } = useAuth();
   const { getCategories } = useCategory();

   useEffect(() => {
      if (token) {
         getCategories(token).then((data) => setCategories(data));
         setIsLoading(false);
      }
   }, [token]);

   if (isLoading) {
      return <div>Loading...</div>;
   }
   return <CategoryList categories={categories} />;
}

export default AllCategories;
