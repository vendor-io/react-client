export function useCategory() {
   const getCategories = async (token) => {
      let categories;
      await fetch(`${import.meta.env.VITE_BACKEND_SERVER}/api/categories`, {
         method: 'GET',
         mode: 'cors',
         cache: 'no-cache',
         headers: {
            Authorization: `Bearer ${token}`
         }
      })
         .then((res) => res.json())
         .then((data) => (categories = data));

      return categories;
   };

   const getCategoryBySlug = async (token, slug) => {
      let category;
      await fetch(`${import.meta.env.VITE_BACKEND_SERVER}/api/categories/${slug}`, {
         method: 'GET',
         mode: 'cors',
         cache: 'no-cache',
         headers: {
            Authorization: `Bearer ${token}`
         }
      })
         .then((res) => res.json())
         .then((data) => (category = data));

      return category;
   };

   const addNewCategory = async (token, uid, requestBody) => {
      let response;

      await fetch(`${import.meta.env.VITE_BACKEND_SERVER}/su/categories`, {
         method: 'POST',
         mode: 'cors',
         cache: 'no-cache',
         headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
            UID: uid
         },
         body: JSON.stringify(requestBody)
      })
         .then((res) => res.json())
         .then((data) => (response = data));

      return response;
   };

   return { getCategories, getCategoryBySlug, addNewCategory };
}
