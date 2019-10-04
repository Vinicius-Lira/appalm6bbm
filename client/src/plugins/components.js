import Vue from 'vue';
import Offset from '@/components/helper/Offset';
import Card from '@/components/material/Card';
import ChartCard from '@/components/material/ChartCard';
import Notification from '@/components/material/Notification';
import StatsCard from '@/components/material/StatsCard';

import ParametrosExame from '@/components/helper/ParametrosExame';
import Snackbar from '@/components/helper/Snackbar';

import Obm from '@/components/material/Obms.vue';
import Hierarquia from '@/components/material/Hierarquia.vue';
import Pessoas from '@/components/material/Pessoas.vue';
import Setores from '@/components/material/Setores.vue';
import GrupoPatrimonio from '@/components/material/GrupoPatrimonio.vue';
import SituacaoPatrimonio from '@/components/material/SituacaoPatrimonio.vue';

import Bens from '@/components/material/Bens.vue';
import MovimentacaoBens from '@/components/material/MovimentacoesBens.vue';
import BaixaPatrimonio from '@/components/material/BaixaPatrimonio.vue';

Vue.component('parametros-exame-dialog', ParametrosExame);
Vue.component('snackbar', Snackbar);

Vue.component("obm", Obm);
Vue.component("hierarquia", Hierarquia);
Vue.component("pessoas", Pessoas);
Vue.component("setores", Setores);
Vue.component("grupoPatrimonio", GrupoPatrimonio);
Vue.component("situacaoPatrimonio", SituacaoPatrimonio);

Vue.component("bens", Bens);
Vue.component("movimentacaoBens", MovimentacaoBens);
Vue.component("baixaPatrimonio", BaixaPatrimonio);

Vue.component(Offset.name, Offset);
Vue.component(Card.name, Card);
Vue.component(ChartCard.name, ChartCard);
Vue.component(Notification.name, Notification);
Vue.component(StatsCard.name, StatsCard);
