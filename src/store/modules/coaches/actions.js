export default {
  async registerCoach(context, data) {
    const userId = context.rootGetters.userId;
    const coachData = {
      //   id: context.rootGetters.userId,
      firstName: data.first,
      lastName: data.last,
      description: data.desc,
      hourlyRate: data.rate,
      areas: data.areas,
    };

    const response = await fetch(
      `https://vue-coach-project-d21fc-default-rtdb.firebaseio.com/coaches/${userId}.json`,
      {
        //PUT不會重複添加檔名一樣的
        method: 'PUT',
        body: JSON.stringify(coachData),
      }
    );
    // const responseData = await response.json();

    if (!response.ok) {
      //error
    }

    context.commit('registerCoach', { ...coachData, id: userId });
  },

  async loadCoaches(context) {
    const response = await fetch(
      //取得所有coaches資料
      'https://vue-coach-project-d21fc-default-rtdb.firebaseio.com/coaches.json'
    );
    const responseData = await response.json();

    if (!response.ok) {
      //error
      const error = new Error(responseData.message || 'Failed to fetch!');
      throw error;
    }

    //處理資料庫資料
    const coaches = [];

    for (const key in responseData) {
      const coach = {
        id: key,
        firstName: responseData[key].firstName,
        lastName: responseData[key].lastName,
        description: responseData[key].description,
        hourlyRate: responseData[key].hourlyRate,
        areas: responseData[key].areas,
      };
      coaches.push(coach);
    }

    context.commit('setCoaches', coaches);
  },
};
