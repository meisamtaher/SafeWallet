pragma solidity 0.8.17;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Escrow {
    uint256  private transferCount;
    enum TransferStatus{
        Pending,
        Reverted,
        Done
    }

    struct Transfer {
        address from;
        address to;
        address token;
        uint256 value;
        TransferStatus status;
    }
    mapping (uint256 => Transfer) transactions;

    event DepositTransfer(address token, address indexed from, address indexed to, uint256 value, uint256 indexed transferId);
    event WithdrawTransfer(address token, address indexed from, address indexed to, uint256 value, uint256 indexed transferId);
    event RevertTransfer(address token, address indexed from, address indexed to, uint256 value, uint256 indexed transferId);

    function depositTransfer(address token, address to,uint256 value)public {
        require(IERC20(token).transferFrom(msg.sender,address(this),value));
        transactions[transferCount] = Transfer(msg.sender, to, token, value, TransferStatus.Pending);
        emit DepositTransfer(token,msg.sender, to, value, transferCount);
        transferCount++;
    }
    function withdrawTransfer(uint256 transferId) public {
        require(transactions[transferId].to == msg.sender,"permission denied");
        require(transactions[transferId].status == TransferStatus.Pending,"this transaction is closed");
        IERC20(transactions[transferId].token).transfer(transactions[transferId].to,transactions[transferId].value);
        transactions[transferId].status = TransferStatus.Done;
        emit WithdrawTransfer(transactions[transferId].token, transactions[transferId].from, transactions[transferId].to, transactions[transferId].value, transferId);
    }
    function revertTransfer(uint256 transferId) public{
        require(transactions[transferId].from == msg.sender,"permission denied");
        require(transactions[transferId].status == TransferStatus.Pending,"this transaction is closed");
        IERC20(transactions[transferId].token).transfer(transactions[transferId].from, transactions[transferId].value);
        transactions[transferId].status = TransferStatus.Reverted;
        emit RevertTransfer(transactions[transferId].token, transactions[transferId].from, transactions[transferId].to, transactions[transferId].value, transferId);
    }
}