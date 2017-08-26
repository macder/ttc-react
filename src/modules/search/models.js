import Immutable from 'immutable';

const routeRecord = Immutable.Record({
  id: null,
  label: '',
})

class Route extends routeRecord {
  /*isDone() {
    return this.get('done');
  }*/

  getLabel() {
    return this.get('label') || null;
  }
}

export default Route;