import StateModule from "../module";

class CatalogState extends StateModule{
  initState() {
    return {
      fetchState: 'pending', // 'error' || 'ok'
      pageItems: [],
      pagesCount: 0,
    };
  }

  // вызывается в в компоненте pages/catalog
  // на роутах '/catalog/:page' и '/'
  // page === useParams().page
  //
  async fetchPageItems (page) {
    // при вызове из роута '/' передаётся undefined
    page = (page === undefined) ? 1 : +page;

    const errorState = {
      fetchState: 'error',
      pageItems: [],
      pagesCount: 0,
    };

    // отсеивает неправильные роуты
    if (Number.isNaN(page) || page < 1) {
      console.error('store.catalog.fetchPageItems - неправильный url');
      setTimeout(() => this.setState(errorState), 1000); // без задержки не срабатывало
    }
    else {
      await fetch(`/api/v1/articles?limit=10&skip=${page * 10 - 10}&fields=items(*),count`)
        .then(res => {
          if (res.ok) return res.json()
          else throw new Error(res.status + ' ' + res.statusText);
        })
        .then(json => {
          if (json.result.items.length) {
            this.setState({
              fetchState: 'ok',
              pageItems: json.result.items,
              pagesCount: Math.ceil(json.result.count / 10),
            })
          } else {
            throw new Error('запрашиваемая страница больше последней');
          }
        })
        .catch(err => {
          console.error('store.catalog.fetchPageItems:', err);
          this.setState(errorState);
        })
    }
  }
}

export default CatalogState;
