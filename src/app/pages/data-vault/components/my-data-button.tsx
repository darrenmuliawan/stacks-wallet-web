import { RouteUrls } from "@shared/route-urls";
import { Box, Button, ButtonProps } from "@stacks/ui";
import { useRef } from "react";
import { FiUser } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useCurrentPageState } from "../hooks/use-data-vault-state";
import { DATA_VAULT_PAGE_ENUM } from "../store/data-vault-store";

export const MyDataButton = (props: ButtonProps) => {
  const ref = useRef<HTMLButtonElement | null>(null);
  const navigate = useNavigate();
  const [page, setPage] = useCurrentPageState();
  
  const handleClick = () => {
    navigate(RouteUrls.MyDataVault);
    setPage(DATA_VAULT_PAGE_ENUM.MyData);
  }

  return (
    <Button
      size="sm"
      pl="base-tight"
      pr='base'
      py='tight'
      fontSize={2}
      mode={page === DATA_VAULT_PAGE_ENUM.MyData ? "secondary" : "primary"}
      position='relative'
      ref={ref}
      borderRadius='10px'
      onClick={handleClick}
      {...props}
    >
      <Box as={FiUser} transform={'unset'} size={'16px'} mr={0} />
      <Box as="span" ml="extra-tight" fontSize="14px">
        My Data
      </Box>
    </Button>
  )
}