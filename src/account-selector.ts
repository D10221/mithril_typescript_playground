import { iTask ,iAccount} from './entities';
import { iViewModel } from './vm-base';
import { AccountController } from './account-controller';
import { Selector, iOption } from './tags';
import { Observable, IObservable , IDisposable} from 'rx';

// var m = <MithrilStatic>require('mithril');

var accountController = new AccountController();

interface iAccoutnSelection
{
    selectionChanged : IObservable<iAccount> ;
    vElement: MithrilVirtualElement;
    unloaded: IObservable<boolean>;

}
export default function AccountSelector(task:iViewModel<iTask>) : iAccoutnSelection
{

    var toOption  = function(task:iViewModel<iTask>, account:iAccount): iOption {
        var option = {
            value: account.id,
            text: account.name,
            selected: task.withValue(x=>x.account).withValue(x=>x.id === account.id).value()
        };
        return option;
    }

    var accounts = accountController
        .accounts
        .map(account=> toOption(task,account));

    var selector = new Selector( accounts);

    //var subscription = selector.onChange.subscribe(option=>{
    //
    //    task.Action( x => x.account = accountController.byId(option.value));
    //});

    //selector.unLoaded.where(x=> x === true ).subscribe(e=> subscription.dispose() );

    return {
        vElement: selector.render(),
        selectionChanged: selector.onChange.select(option=> accountController.byId(option.value)),
        //fire once
        unloaded : selector.unLoaded.where(x=> x === true )
    }
}
