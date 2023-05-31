import { OrganizationMemberApiService, OrganizationMemberItemModel } from 'aesirx-lib';
import { runInAction } from 'mobx';

class MemberStore {
  async getList(callbackOnSuccess: any, callbackOnError: any, filters: any) {
    try {
      const getListAPIService = new OrganizationMemberApiService();
      const respondedData = await getListAPIService.getList(filters);
      if (respondedData) {
        runInAction(() => {
          callbackOnSuccess(respondedData);
        });
      } else {
        callbackOnError({
          message: 'Something went wrong from Server response',
        });
      }
      return respondedData;
    } catch (error: any) {
      runInAction(() => {
        callbackOnError(error?.response?.data);
      });
    }

    return false;
  }

  async getDetail(id: any, callbackOnSuccess: any, callbackOnError: any) {
    if (!id) return false;

    try {
      const results = true;

      if (results) {
        const getDetailInfoAPIService = new OrganizationMemberApiService();

        const respondedData = await getDetailInfoAPIService.getDetail(id);

        if (respondedData) {
          runInAction(() => {
            callbackOnSuccess(respondedData);
          });
        } else {
          callbackOnError({
            message: 'Something went wrong from Server response',
          });
        }
      }
    } catch (error: any) {
      runInAction(() => {
        callbackOnError(error?.response?.data);
      });
    }
  }

  async create(createFieldData: any, callbackOnSuccess: any, callbackOnError: any) {
    try {
      const convertedUpdateGeneralData =
        OrganizationMemberItemModel.__transformItemToApiOfCreation(createFieldData);
      let resultOnSave: { result: '' };
      const createFieldApiService = new OrganizationMemberApiService();

      // eslint-disable-next-line prefer-const
      resultOnSave = await createFieldApiService.create(convertedUpdateGeneralData);
      if (resultOnSave?.result) {
        runInAction(() => {
          callbackOnSuccess(resultOnSave?.result, 'Created successfully');
        });
      } else {
        runInAction(() => {
          callbackOnError(resultOnSave);
        });
      }
      return resultOnSave?.result;
    } catch (error: any) {
      runInAction(() => {
        callbackOnError(error?.response?.data);
      });
      return 0;
    }
  }

  async update(updateFieldData: any, callbackOnSuccess: any, callbackOnError: any) {
    try {
      const convertedUpdateGeneralData =
        OrganizationMemberItemModel.__transformItemToApiOfUpdation(updateFieldData);

      let resultOnSave: { result: '' };
      const updateFieldApiService = new OrganizationMemberApiService();
      // eslint-disable-next-line prefer-const
      resultOnSave = await updateFieldApiService.update(convertedUpdateGeneralData);
      if (resultOnSave?.result) {
        runInAction(() => {
          callbackOnSuccess(resultOnSave?.result, 'Updated successfully');
        });
      } else {
        runInAction(() => {
          callbackOnError(resultOnSave);
        });
      }
      return resultOnSave?.result;
    } catch (error: any) {
      runInAction(() => {
        callbackOnError(error?.response?.data);
      });
      return 0;
    }
  }
}

export { MemberStore };
