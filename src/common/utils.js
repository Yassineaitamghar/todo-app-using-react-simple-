class Utils {
   static getAccessToken() {
      return localStorage.getItem('accessToken');
   }

   static setAccessToken(value) {
      return localStorage.setItem('accessToken', value);
   }

   static removeAccessToken() {
      return localStorage.removeItem('accessToken');
   }
}

export default Utils;
