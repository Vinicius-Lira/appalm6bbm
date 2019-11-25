import Vue from 'vue';
import Offset from '@/components/helper/Offset';
import Card from '@/components/material/Card';
import ChartCard from '@/components/material/ChartCard';
import Notification from '@/components/material/Notification';
import StatsCard from '@/components/material/StatsCard';

import Snackbar from '@/components/helper/Snackbar';

import NovaPessoa from '@/components/material/NovaPessoa';
import EditPessoa from '@/components/material/EditPessoa';
import PermissoesPessoa from '@/components/material/PermissoesPessoa';

import ProdutosLote from '@/components/material/ProdutosLote';

import ItemEntrada from '@/components/material/ItemEntrada';

import Loading from '@/components/material/Loading';

Vue.component('item-entrada', ItemEntrada);

Vue.component('produtos-lote', ProdutosLote);

Vue.component('loading', Loading);
Vue.component('snackbar', Snackbar);

Vue.component('permissoes-pessoa', PermissoesPessoa);
Vue.component('nova-pessoa', NovaPessoa);
Vue.component('editar-pessoa', EditPessoa);

Vue.component(Offset.name, Offset);
Vue.component(Card.name, Card);
Vue.component(ChartCard.name, ChartCard);
Vue.component(Notification.name, Notification);
Vue.component(StatsCard.name, StatsCard);
