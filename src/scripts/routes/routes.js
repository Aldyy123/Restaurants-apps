import List from '../views/pages/list'
import Detail from '../views/pages/detail'
import Favorite from '../views/pages/favorite'
import Search from '../views/pages/search'

const Routes = {
  '/': List,
  '/detail/:id': Detail,
  '/favorite': Favorite,
  '/search?q=:query': Search
}

export default Routes
