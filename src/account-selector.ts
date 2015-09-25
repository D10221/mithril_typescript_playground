import { iTask } from './entities';
import { iViewModel } from './vm-base';
import { AccountController } from './account-controller';
import { Selector, iOption } from './tags';


var accountController = new AccountController();

export default function AccountSelector(task:iViewModel<iTask>)
{
    function getAccountById(option:iOption) {
        return accountController.byId(option.value);
    }

    var accounts = accountController.accounts.map(account=> {
        return <iOption>{
            value: account.id,
            text: account.name,
            selected: task.value(t=> t.id == account.id)
        }
    });

    var selector = new Selector("account-selector", accounts);

    selector.onChange.subscribe(option=>{
        task.Action( x => x.account = getAccountById(option.value));
    });

    return selector.render();
}
