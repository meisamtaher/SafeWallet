pragma solidity 0.8.17;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract SafeTransfer {
    enum AddressType{
        SmartContract,
        UsedEOA,
        UnusedEAO
    }
    function checkAddress(address adr)public view returns (AddressType){
        if(adr.code.length>0){
            return AddressType.SmartContract;
        }
        if(adr.balance> 0){
            return AddressType.UsedEOA;
        }
        else 
            return AddressType.UnusedEAO;
    }
    function saferansferERC20(address token, address to, uint256 value, AddressType adrType) public payable returns (bool, uint8){
        if(checkAddress(to) == adrType){
            return (IERC20(token).transfer(to, value),1);
        }
        else{
            return (false,0);
        }
    }
}