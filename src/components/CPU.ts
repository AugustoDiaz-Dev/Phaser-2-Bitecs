import { 
    defineComponent,
    Types,
} from 'bitecs'

export const CPU = defineComponent({
    timeBetweenAction: Types.ui32, 
    acumulatedTime: Types.ui32
})