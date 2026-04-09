<?js

class appController extends apiController{

  async randomNumberAction() {
    await Utils.sleep(500)
    return this.ssrQueryData?.num || 0
  }

}
