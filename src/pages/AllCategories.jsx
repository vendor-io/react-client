import { useState, useEffect } from 'react';
import { CategoryList } from '../components/CategoryList';
import { useAuth } from '../hooks/useAuth';
import { useCategory } from '../hooks/useCategory';
import { Spinner } from '../components/Spinner';

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
   }, [token, getCategories]);

   if (isLoading) {
      return <Spinner />;
   }
   return <CategoryList categories={categories} />;
}

export default AllCategories;
